import React, {ReactNode, useEffect, useState} from "react";
import Header from "@/lib/components/Organisms/Header";
import HEAD from "next/head";
import {
    fetchStoreDeductionsByStoreID,
    fetchStoreCongestionByStoreID,
    fetchStoreByStoreID
} from "@/lib/graphql/graphql";
import initStoresInfoData from "@/public/data/test/storesInfoData.json";
import deductionListSampleData from "@/public/data/test/deductionListSampleData.json";
import StoresInfoType from "@/lib/type/StoresInfoType";
import {Box, Backdrop, CircularProgress, Button, ThemeProvider} from "@mui/material";
import {Congestion} from "@/src/API";
import theme from "@/lib/style/theme";
import TextField from "@mui/material/TextField";

type DeductionPoint = {
    attentionTimes: number;
    deductionPoints: number;
}

// SSGとかSSRに対応させてAPIキーの露出を防ぐ
enum DeductionStatusEnum {
    // 0→処理中、1→取り消し、2→注意、3→減点
    PROCESS = 0,
    CANCEL = 1,
    ATTENTION = 2,
    DEDUCTION = 3
}

const getDeductionStatusStr = (deductionStatusEnum: DeductionStatusEnum) => {
    let returnStr: string = "";
    switch (deductionStatusEnum) {
        case DeductionStatusEnum.PROCESS:
            returnStr = "処理中";
            break;
        case DeductionStatusEnum.CANCEL:
            returnStr = "取り消し";
            break;
        case DeductionStatusEnum.ATTENTION:
            returnStr = "注意";
            break;
        case DeductionStatusEnum.DEDUCTION:
            returnStr = "減点";
            break;
    }
    return returnStr;
}

enum CongestionStatusEnum {
    STOP = 0,
    EMPTY = 1,
    LITTLE_CROWDED = 2,
    CROWDED = 3,
}

const getCongestionStatusStr = (congestionStatusEnum: CongestionStatusEnum) => {
    let returnStr = "";
    switch (congestionStatusEnum) {
        case CongestionStatusEnum.STOP:
            returnStr = "中止しています";
            break;
        case CongestionStatusEnum.EMPTY:
            returnStr = "空いています";
            break;
        case CongestionStatusEnum.LITTLE_CROWDED:
            returnStr = "少し混雑しています";
            break;
        case CongestionStatusEnum.CROWDED:
            returnStr = "混雑しています";
            break;
        default:
            returnStr = "混雑状況にエラーが発生しています";
            break;
    }
    return returnStr;
}

type DeductionBoxProps = {
    index: number;
    points: number;
    content: string;
    status: DeductionStatusEnum;
}

const InfoBox = ({title, children}: { title: string, children: ReactNode }) => (
    <Box sx={{bgcolor: "#d3d3d3", padding: "1em", borderRadius: "1em", marginBottom: "1em"}}>
        <div style={{color: "gray", fontSize: "0.7em"}}>{title}</div>
        <div style={{color: "black"}}>
            <span>{children}</span>
        </div>
    </Box>
)

const Storepage = () => {
    const [store, setStore] = useState<StoresInfoType | null>(null);
    const [deductions, setDeductions] = useState<DeductionBoxProps[]>([]);
    const [deductionsDetail, setDeductionPoints] = useState<DeductionPoint>({
        attentionTimes: 0,
        deductionPoints: 0
    });
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [congestion, setCongestion] = useState<Congestion | null>(null);
    const [textFieldValue, setTextFieldValue] = useState<string>("");


    const fetchInfos = async (storeID: string) => {
        const fetchPromise = fetchStoreCongestionByStoreID(storeID);
        const getDeductions = await fetchStoreDeductionsByStoreID(storeID);


        for (const currentDeduction of getDeductions) {
            const targetDeduction = deductionListSampleData.find(
                (element) => element.index == currentDeduction.deductionIndex
            );
            if (targetDeduction) {
                const element: DeductionBoxProps = {status: currentDeduction.status, ...targetDeduction}
                setDeductions(prevArray => [...prevArray, element]);

                // statusについて
                // 0→処理中、1→取り消し、2→注意、3→減点
                deductionsDetail.attentionTimes += 1;
                // TODO:これではダメなので修正する
                if (currentDeduction.status == DeductionStatusEnum.ATTENTION) {
                    setDeductionPoints(prevState => ({
                        attentionTimes: prevState.attentionTimes + 1,
                        deductionPoints: prevState.deductionPoints
                    }))
                } else if (currentDeduction.status == DeductionStatusEnum.DEDUCTION) {
                    if (targetDeduction) {
                        setDeductionPoints(prevState => ({
                            attentionTimes: prevState.attentionTimes,
                            deductionPoints: prevState.deductionPoints + targetDeduction.points
                        }))
                    }
                }

            }

            const getCongestion = await fetchPromise;
            setCongestion(getCongestion);
        }
    }

    // TODO:Cookieを使いたい！
    const logIn = async (storeKey: string) => {
        resetStates();
        if (storeKey == "") {
            alert("テキストフィールドに何も入力されていません");
        } else {
            // 正規表現パターン：アルファベット（大文字・小文字）と数字のみを許可
            const pattern = /^[A-Za-z0-9]*$/;

            if (pattern.test(storeKey)) {
                setIsPageLoading(true);
                try {
                    const getStore = await fetchStoreByStoreID(storeKey);

                    if (getStore) {
                        const targetStoreInfo = initStoresInfoData.find((element) => element.areaNum == getStore.areaNum);
                        if (targetStoreInfo) {
                            setStore(targetStoreInfo);
                            await fetchInfos(storeKey);
                        }
                    }
                } catch (error) {
                    alert("店舗キーに誤りがあります。");
                }
                setIsPageLoading(false);
            } else {
                alert("店舗IDはアルファベットと数字しか含まれません。確認してください。");
            }
        }
    };

    const logOut = () => {
        resetStates();
    };

    const resetStates = () => {
        setDeductions([]);
        setDeductionPoints(
            {
                attentionTimes: 0,
                deductionPoints: 0
            });
        setStore(null);
    }

    return (
        <>

            <Header isMapPage={false}/>
            <div style={{marginTop: "70px"}}>
                {store ?
                    <div style={{padding: "20px"}}>
                        <div style={{fontWeight: "bold"}}>
                            <span style={{fontSize: "2rem"}}>{store?.storeName}</span><br/>
                            {store?.groupName && <span style={{marginRight: "0.5em"}}>{store?.groupName}</span>}
                            <span>区画番号 {store?.areaNum}番</span>
                        </div>
                        <div style={{marginTop: "30px"}}>
                            <div style={{fontSize: "1.7rem", fontWeight: "bold"}}>
                                詳細
                            </div>
                            <InfoBox title={"販売品目"}>{store?.food}</InfoBox>
                            <InfoBox
                                title={"現在の混雑状況"}>{congestion && getCongestionStatusStr(congestion.congestionLevel)}</InfoBox>
                            <InfoBox title={"減点状況"}>
                                <div style={{fontSize: "1.5rem"}}>
                                    注意 {deductionsDetail.attentionTimes}回,
                                    減点 {deductionsDetail.deductionPoints}点
                                </div>
                                <div>
                                    {deductions.map((deduction, key) => (
                                        <div key={key}>
                                            {deduction.points}点
                                            減点項目 {getDeductionStatusStr(deduction.status)}<br/>
                                            {deduction.content}
                                        </div>
                                    ))}
                                </div>
                            </InfoBox>
                            <button onClick={() => logOut()}>Sign Out</button>
                            <br/>
                        </div>
                    </div> : <div>
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{fontWeight: "Bold", padding: "1em", fontSize: "1.5rem"}}>
                                このページは模擬店出店者向けのページです。<br/>
                                下の入力欄に店舗キーを入力してください。
                            </div>

                            <ThemeProvider theme={theme}>
                                <div style={{width: "80%", maxWidth: "500px"}}>
                                    <TextField fullWidth
                                               id="standard-search"
                                               label="店舗キー"
                                               type="search"
                                               variant="standard"
                                               onChange={(event) => setTextFieldValue(event.target.value)}
                                    />
                                </div>
                                <Button variant="contained" sx={{marginTop: 3}}
                                        onClick={() => logIn(textFieldValue)}>ログイン</Button>
                            </ThemeProvider>
                        </div>
                    </div>
                }
            </div>
            <Backdrop open={isPageLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}

export default Storepage;