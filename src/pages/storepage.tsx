import React, {useEffect, useState} from "react";
import Header from "@/src/lib/components/Organisms/Header";
import {
    fetchStoreDeductionsByStoreID,
    fetchStoreCongestionByStoreID,
    fetchStoreByStoreID
} from "@/src/lib/graphql/graphql";
import initStoresInfoData from "@/public/data/test/storesInfoData.json";
import deductionListSampleData from "@/public/data/test/deductionListSampleData.json";
import StoresInfoType from "@/src/lib/type/StoresInfoType";
import {Box, Backdrop, CircularProgress, Button, ThemeProvider} from "@mui/material";
import {Congestion as APICongestionType} from "@/src/graphql/API";
import {useCookies} from "react-cookie";
import InfoBox from "@/src/lib/components/Atom/InfoBox";
import LoginPage from "@/src/lib/components/Organisms/LoginPage";
import {
    DeductionStatusEnum,
    DeductionsSummaryType,
    DeductionInfoType,
    getDeductionStatusStr
} from "@/src/lib/type/DeductionDataType";
import {
    CongestionDataType,
    CongestionStatusEnum,
    getCongestionStatusStr,

} from "@/src/lib/type/CongestionDataType";
import {useRouter} from "next/router";
import {
    COOKIE_NAMES,
    DatabaseValueCookieKeptType,
    StoreIndexCookieKeptType
} from "@/src/lib/cookieController";

// Cookieに保存するのはサーバから取ってきてる「減点情報(点数とその詳細)」、「混雑状況」、「区画番号」、「店舗ID(テンポキー)」


const Storepage = () => {
    const [storeInfo, setStoreInfo] = useState<StoresInfoType | null>(null);
    const [deductionsInfo, setDeductionsInfoInfo] = useState<DeductionInfoType[]>([]);
    const [deductionsSummary, setDeductionSummary] = useState<DeductionsSummaryType>({
        attentionTimes: 0,
        deductionPoints: 0
    });
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [congestion, setCongestion] = useState<APICongestionType | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies(Array.from(COOKIE_NAMES));
    const [storeID, setStoreID] = useState<string>("");
    const [finishedFirstLoad, setFinishedFirstLoad] = useState<boolean>(false);
    const router = useRouter();

    // errorが発生したときやどこかの値がおかしいときはCookieを受け入れない&もとのCookieを消す
    useEffect(() => {
        // クエリパラメータがないとき実行するCookie管理関数
        async function handleCookieWithNoParam() {
            if (cookies) {
                if (cookies.bkc_fes_storeIndex) {
                    let hasValidCookie: boolean;
                    let tempStoreInfo: StoresInfoType | null = null;
                    let tempStoreID: string | null = null;
                    try {
                        // errorをキャッチできなかったら、nullであることは補償されているはず
                        const getCookieData = cookies.bkc_fes_storeIndex as StoreIndexCookieKeptType;
                        setStoreInfo(getCookieData.storeInfo);
                        setStoreID(getCookieData.storeID);
                        tempStoreInfo = getCookieData.storeInfo;
                        tempStoreID = getCookieData.storeID;
                        hasValidCookie = true;
                    } catch (error) {
                        resetCookie();
                        console.log(error);
                        return;
                    }

                    // Cookie「bkc_fes_storeIndex」がないと、そもそもCookie「bkc_fes_databaseValue」も参照しない
                    if (cookies.bkc_fes_databaseValue) {
                        try {
                            const getCookieData = cookies.bkc_fes_databaseValue as DatabaseValueCookieKeptType;
                            setDeductionsInfoInfo(getCookieData.deductionsInfo);
                            setDeductionSummary(getCookieData.deductionsSummary);
                            setCongestion(getCookieData.congestion);
                        } catch (error) {
                            resetStates();
                            removeCookie("bkc_fes_databaseValue");
                            console.log(error);
                            return;
                        }
                    } else {
                        setIsPageLoading(true);
                        if (tempStoreID && tempStoreInfo) {
                            await fetchInfosFromDatabase(tempStoreID, tempStoreInfo.areaNum);
                        }
                        setIsPageLoading(false);
                    }
                } else {
                    // 「bkc_fes_storeIndex」がないのに、「bkc_fes_databaseValue」がある場合は「bkc_fes_databaseValue」を削除
                    if (cookies.bkc_fes_databaseValue) {
                        removeCookie("bkc_fes_databaseValue");
                    }
                }
            }

        }

        // URLパラメータが指定されているときのCookieの扱い
        async function handleCookieWithParam(storeIDByParam: string) {
            let hasValidCookie: boolean = false;
            if (cookies) {
                if (cookies.bkc_fes_storeIndex) {
                    let tempStoreInfo: StoresInfoType | null = null;
                    let tempStoreID: string | null = null;
                    let getCookieStoreIndexData: StoreIndexCookieKeptType;
                    try {
                        // errorをキャッチできなかったら、nullであることは補償されているはず
                        getCookieStoreIndexData = cookies.bkc_fes_storeIndex as StoreIndexCookieKeptType;
                    } catch (error) {
                        resetCookie();
                        console.log(error);
                        return;
                    }
                    if (getCookieStoreIndexData.storeID == storeIDByParam) {
                        setStoreInfo(getCookieStoreIndexData.storeInfo);
                        setStoreID(getCookieStoreIndexData.storeID);
                        tempStoreInfo = getCookieStoreIndexData.storeInfo;
                        tempStoreID = getCookieStoreIndexData.storeID;

                        hasValidCookie = true;

                        if (cookies.bkc_fes_databaseValue) {
                            try {
                                const getCookieDatabaseData = cookies.bkc_fes_databaseValue as DatabaseValueCookieKeptType;
                                setDeductionsInfoInfo(getCookieDatabaseData.deductionsInfo);
                                setDeductionSummary(getCookieDatabaseData.deductionsSummary);
                                setCongestion(getCookieDatabaseData.congestion);
                            } catch (error) {
                                resetStates();
                                removeCookie("bkc_fes_databaseValue");
                                console.log(error);
                                return;
                            }
                        } else {
                            setIsPageLoading(true);
                            if (tempStoreID && tempStoreInfo) {
                                await fetchInfosFromDatabase(tempStoreID, tempStoreInfo.areaNum);
                            }
                            setIsPageLoading(false);
                        }
                    }
                }
            }

            if (!hasValidCookie) {
                await logIn(storeIDByParam);
            }


        }


        // Cookieとリクエストパラメータがどっちもあるなら
        // リクエストパラメータを優先する
        // let hasUrlParam = false;
        if (!finishedFirstLoad) {
            if (router.isReady) {
                setFinishedFirstLoad(true);
                setIsPageLoading(false);

                let keyInUrlParam: string | null = null;
                let hasValidUrlParam: boolean = false;

                const paramKey = router.query.key;

                if (paramKey != null) {
                    if (Array.isArray(paramKey) || paramKey == "") {
                        hasValidUrlParam = false;
                    } else {

                        (async () => {
                            try {
                                // @ts-ignore
                                await fetchAreaNumByStoreID(router.query.key);
                                // @ts-ignore
                                keyInUrlParam = paramKey as string;
                                hasValidUrlParam = true;
                            } catch (e) {
                                let error = e as Error;
                                hasValidUrlParam = false;
                                window.alert(error.message);
                            }
                        })();
                    }
                    removeQueryParam("key");
                }
                (async () => {
                    if (hasValidUrlParam && keyInUrlParam) {
                        await handleCookieWithParam(keyInUrlParam);
                    } else {
                        await handleCookieWithNoParam();
                    }
                })();
            } else {
                setIsPageLoading(true);
            }
        }
    }, [router.isReady]);

    const fetchInfosFromDatabase = async (storeID: string, areaNum: number) => {
        const targetStoreInfo = initStoresInfoData.find((element) => element.areaNum == areaNum);
        if (targetStoreInfo) {
            setStoreInfo(targetStoreInfo);

            // ログインに成功したとき→Cookieを入れる
            // 入れる値がnullではないか
            const fetchPromise = fetchStoreCongestionByStoreID(storeID);
            const getDeductions = await fetchStoreDeductionsByStoreID(storeID);

            let tempDeductions: DeductionInfoType[] = [];
            let tempDeductionSummary: DeductionsSummaryType = {
                attentionTimes: 0,
                deductionPoints: 0
            }

            for (const currentDeduction of getDeductions) {
                const targetDeduction = deductionListSampleData.find(
                    (element) => element.index == currentDeduction.deductionIndex
                );
                if (targetDeduction) {
                    const element: DeductionInfoType = {status: currentDeduction.status, ...targetDeduction}
                    tempDeductions.push(element);

                    // statusについて
                    // 0→処理中、1→取り消し、2→注意、3→減点
                    if (currentDeduction.status == DeductionStatusEnum.ATTENTION) {
                        tempDeductionSummary.attentionTimes = tempDeductionSummary.attentionTimes + 1;
                    } else if (currentDeduction.status == DeductionStatusEnum.DEDUCTION) {
                        if (targetDeduction) {
                            tempDeductionSummary.deductionPoints = tempDeductionSummary.deductionPoints + targetDeduction.points;
                        }
                    }
                }
            }
            setDeductionSummary(tempDeductionSummary);
            setDeductionsInfoInfo(tempDeductions);
            const getCongestion = await fetchPromise;
            setCongestion(getCongestion);


            const storeInfoCookieKeptObj: DatabaseValueCookieKeptType = {
                deductionsSummary: tempDeductionSummary,
                deductionsInfo: tempDeductions,
                congestion: getCongestion
            };

            const tempTime = new Date();

            // 3分を足す
            tempTime.setMinutes(tempTime.getMinutes() + 3);

            setCookie('bkc_fes_databaseValue', JSON.stringify(storeInfoCookieKeptObj), {
                expires: tempTime,
                path: '/'
            });

            if (!cookies.bkc_fes_storeIndex) {
                const storeIndexCookieKept: StoreIndexCookieKeptType = {
                    storeInfo: targetStoreInfo,
                    storeID: storeID
                }

                setCookie("bkc_fes_storeIndex", JSON.stringify(storeIndexCookieKept));
            }
        }
    }


// このボタンが押されているときはCookieはないハズ
    const logIn = async (storeKey: string): Promise<void> => {
        resetStates();
        setIsPageLoading(true);
        try {
            const resultAreaNum = await fetchAreaNumByStoreID(storeKey);
            resetCookie();
            await fetchInfosFromDatabase(storeKey, resultAreaNum);
        } catch (e) {
            let error = e as Error;
            console.log(error);
            window.alert(error.message);
        }
        setIsPageLoading(false);
    };

// うまくいっていたら、trueを返して、ダメだったらstringを返す
    const fetchAreaNumByStoreID = async (storeID: string): Promise<number> => {
        let isValid = false;
        let errorStr: string = "";
        let getAreaNum: number | null = null;

        if (storeID == "") {
            errorStr = "テキストフィールドに何も入力されていません";
        } else {
            // 正規表現パターン：アルファベット（大文字・小文字）と数字のみを許可
            const pattern = /^[A-Za-z0-9]*$/;

            if (pattern.test(storeID)) {
                setIsPageLoading(true);
                try {
                    const getStore = await fetchStoreByStoreID(storeID);

                    if (getStore) {
                        isValid = true;
                        getAreaNum = getStore.areaNum;
                        errorStr = "店舗キーがデータベースに登録されていません";
                    }
                } catch (error) {
                    errorStr = "店舗キーがデータベースに登録されていないか、データベースを読込むことができません";
                    console.log(error);
                }
                setIsPageLoading(false);
            } else {
                errorStr = "店舗IDはアルファベットと数字しか含まれません。確認してください。";
            }
        }
        if (isValid) {
            if (getAreaNum) {
                return getAreaNum;
            } else {
                throw new Error("正しく区画番号が設定されませんでした");
            }
        } else {
            throw new Error(errorStr);
        }
    }

    const logOut = () => {
        resetCookie();
        resetStates();
    };

    const resetCookie = () => {
        console.log("Cookie RESET");
        removeCookie("bkc_fes_storeIndex");
        removeCookie("bkc_fes_databaseValue");
    }

    const resetStates = () => {
        setDeductionsInfoInfo([]);
        setDeductionSummary(
            {
                attentionTimes: 0,
                deductionPoints: 0
            });
        setStoreInfo(null);
    }

    const removeQueryParam = (key: string) => {
        // 現在の query オブジェクトをコピー
        const newQuery: { [key: string]: string | string[] | undefined } = { ...router.query };

        // キーを削除
        delete newQuery[key];

        // 新しいクエリでルートを更新
        router.push({
            pathname: router.pathname,
            query: newQuery,
        }, undefined, { shallow: true });  // shallow: true でページ全体の再レンダリングを回避
    };

    return (
        <>
            <Header isMapPage={false}/>
            <div style={{marginTop: "70px"}}>
                {storeInfo ?
                    <div style={{padding: "20px"}}>
                        <div style={{fontWeight: "bold"}}>
                            <span style={{fontSize: "2rem"}}>{storeInfo?.storeName}</span><br/>
                            {storeInfo?.groupName &&
                                <span style={{marginRight: "0.5em"}}>{storeInfo?.groupName}</span>}
                            <span>区画番号 {storeInfo?.areaNum}番</span>
                        </div>
                        <div style={{marginTop: "30px"}}>
                            <div style={{fontSize: "1.7rem", fontWeight: "bold"}}>
                                詳細
                            </div>
                            <InfoBox title={"販売品目"}>{storeInfo?.food}</InfoBox>
                            <InfoBox
                                title={"現在の混雑状況"}>{congestion && getCongestionStatusStr(congestion.congestionLevel)}</InfoBox>
                            <InfoBox title={"減点状況"}>
                                <div style={{fontSize: "1.5rem"}}>
                                    注意 {deductionsSummary.attentionTimes}回,
                                    減点 {deductionsSummary.deductionPoints}点
                                </div>
                                <div>
                                    {deductionsInfo.map((deduction, key) => (
                                        <div key={key}>
                                            {deduction.points}点
                                            減点項目 {getDeductionStatusStr(deduction.status)}<br/>
                                            {deduction.content}
                                        </div>
                                    ))}
                                </div>
                            </InfoBox>
                            <div style={{fontSize: "0.5rem"}}>※これらの情報は約３分ごとに更新されます。</div>
                            <button onClick={() => logOut()}>Sign Out</button>
                            <br/>
                        </div>
                    </div> :
                    <LoginPage onLogInBtnClicked={logIn}/>
                }
            </div>
            <Backdrop open={isPageLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}

export default Storepage;