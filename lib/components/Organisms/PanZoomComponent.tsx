import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {useWindowSize} from "@/lib/hooks/useWindowSize";
import StoresInfoType from "@/lib/type/StoresInfoType";
import congestionDataSample from "@/public/data/test/congestionDataSample.json";
import CongestionDataType from "@/lib/type/CongestionDataType";
import StorePaneType from "@/lib/type/StorePaneType";
import SpecialMarks from "@/lib/components/Molecules/SpecialMarks";
import CongestionMark from "@/lib/components/Atom/Image/CongestionMark";

//TODO:座標のデータを入れたものを作る
//下のはサンプルデータ
const points = [
    {areaNum: 1, x: 1090, y: 450},
    {areaNum: 2, x: 1090, y: 480},
    {areaNum: 3, x: 1090, y: 510},
    {areaNum: 4, x: 950, y: 385},
    {areaNum: 5, x: 1000, y: 385},
    {areaNum: 6, x: 1070, y: 535},
    {areaNum: 7, x: 1045, y: 560},
    {areaNum: 8, x: 1020, y: 585},
    {areaNum: 9, x: 995, y: 605},
    {areaNum: 10, x: 970, y: 585},
    {areaNum: 11, x: 945, y: 560},
    {areaNum: 12, x: 920, y: 535},
    {areaNum: 13, x: 885, y: 535},
    {areaNum: 14, x: 860, y: 510},
    {areaNum: 15, x: 1050, y: 385},
];

type Borders = {
    leftXBoarder: number;
    rightXBoarder: number;
    topYBoarder: number;
    bottomYBoarder: number;
}

type Props = {
    storePaneDataSetter: Dispatch<SetStateAction<StorePaneType | null>>
    targetStoresInfo: StoresInfoType[];
    focusedNum: number | null | undefined;
};


const PanZoomComponent: FC<Props> = ({storePaneDataSetter, targetStoresInfo, focusedNum}: Props) => {
    const [screenHookWidth, screenHookHeight] = useWindowSize();
    const movableRef = useRef<any>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);

    const storesInfoData: StoresInfoType[] = targetStoresInfo;
    const congestionData: CongestionDataType[] = congestionDataSample;

    const [screenHeight, setScreenHeight] = useState<number>();

    const MAX_SCALE = 2.5;

    useEffect(() => {
        const innerHeightSize = window.innerHeight;

        //console.log("innerHeightSize:" + innerHeightSize);
        //setScreenHeight(innerHeightSize);
    }, []);


    const handleImgClicked = (getStorePaneData: StorePaneType) => {
        storePaneDataSetter(getStorePaneData);
    }

    const getBoarders = (scale: number): Borders => {
        const innerWidthSize = window.innerWidth;
        const innerHeightSize = window.innerHeight;


        //console.log("image-width:" + imgRef.current!.clientWidth + " / image-height:" + imgRef.current!.clientHeight);
        //console.log("screen-width:" + innerWidthSize + " / screen-height:" + innerHeightSize);


        let leftXBoarder;
        let rightXBoarder;
        let topYBoarder;
        let bottomYBoarder;

        if (innerWidthSize > imgRef.current!.clientWidth) {
            //  フルスクリーンで表示されるとき
            leftXBoarder = 0;
            rightXBoarder = -(imgRef.current!.clientWidth * scale - divRef.current!.clientWidth);
            topYBoarder = 0;
            bottomYBoarder = innerHeightSize - imgRef.current!.clientHeight * scale;

        } else {
            //　スマホなどで横の方が小さく表示されるとき
            leftXBoarder = ((imgRef.current!.clientWidth - innerWidthSize) / 2);
            rightXBoarder = -(imgRef.current!.clientWidth * scale - (leftXBoarder + innerWidthSize));
            topYBoarder = 0;
            bottomYBoarder = innerHeightSize - imgRef.current!.clientHeight * scale;
        }
        //console.log("leftXBoarder:" + leftXBoarder + " / rightXBoarder:" + rightXBoarder + " / topYBoarder:" + topYBoarder + " / bottomYBoarder:" + bottomYBoarder);

        return {leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder};

    };

    const handleStop = (e: any) => {
        //const innerWidthSize = window.innerWidth;
        //const innerHeightSize = window.innerHeight;

        let {positionX, positionY, scale} = e.state;

        const {leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder} = getBoarders(scale);
        //alert(`x:${positionX}, y:${positionY}, scale: ${scale}, screenHeight: ${innerHeightSize},screenWidth: ${innerWidthSize}`);

        //console.log(`x:${positionX}, y:${positionY}, scale: ${scale}, screenHeight: ${innerHeightSize},screenWidth: ${innerWidthSize}`);

        if (scale < 1) {

            //デフォルトの機能で戻ってくれる
        } else {

            if (positionX > leftXBoarder && positionY > topYBoarder) {
                //console.log("should move 左上");
                movableRef.current.setTransform(leftXBoarder, topYBoarder, scale);
            } else if (positionX < rightXBoarder && positionY > topYBoarder) {
                //console.log("should mov2　右上");
                movableRef.current.setTransform(rightXBoarder, topYBoarder, scale);
            } else if (positionX > leftXBoarder && positionY < bottomYBoarder) {
                //console.log("should mov3　左下");
                movableRef.current.setTransform(leftXBoarder, bottomYBoarder, scale);
            } else if (positionX < rightXBoarder && positionY < bottomYBoarder) {
                //console.log("should move右下");
                movableRef.current.setTransform(rightXBoarder, bottomYBoarder, scale);


            } else if (positionX > leftXBoarder) {
                //console.log("should move5　左");
                movableRef.current.setTransform(leftXBoarder, positionY, scale);
            } else if (positionX < rightXBoarder) {
                //console.log("should move5　右");
                movableRef.current.setTransform(rightXBoarder, positionY, scale);
            } else if (positionY > 0) {
                //console.log("should move6　上");
                movableRef.current.setTransform(positionX, 0, scale);
            } else if (positionY < bottomYBoarder) {
                //console.log("should move　下");
                movableRef.current.setTransform(positionX, bottomYBoarder, scale);
            } else {
                //console.log("ok");
            }

        }
    }

    const makeCenterFocus = (x: number, y: number) => {
        //console.log(`x-point:${(screenHookHeight / 1000) * point?.x}, y-point:${(screenHookHeight / 1000) * point?.y}`);

        //1.5がMAX_SCALEがいい
        const FOCUS_SCALE = MAX_SCALE;

        //中央にフォーカスさせる
        movableRef.current.setTransform(
            -(screenHookHeight / 1000) * x * FOCUS_SCALE + divRef.current!.clientWidth / 2,
            -(screenHookHeight / 1000) * y * FOCUS_SCALE + screenHookHeight / 2, FOCUS_SCALE);
    }


    return (
        <div
            ref={divRef}
            style={{
                height: screenHookHeight,
                /*border: "10px solid blue",
                boxSizing: "border-box"*/
            }}
        >
            <TransformWrapper
                initialScale={1}
                minScale={1}
                maxScale={MAX_SCALE}

                limitToBounds={false}
                onPanningStop={(event) => {
                    handleStop(event);
                }}

                onZoomStop={(event) => {
                    handleStop(event);
                }}


                ref={movableRef}
            >
                <TransformComponent>
                    <div style={{
                        height: screenHookHeight,
                    }}>
                        {/*↑この２つを消したら、うまく横スクロールできる*/}
                        <img
                            ref={imgRef}
                            height={screenHookHeight}
                            src="/img/0522-campusMap.svg"
                            //src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg"
                            alt="campusMap"
                            // style={{border: "10px solid red", boxSizing: "border-box"}}

                        />
                        <div
                            style={{
                                height: screenHookHeight,
                                width: "auto",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                display: "block",
                                margin: "0 auto",
                                pointerEvents: "none",
                            }}
                        >
                            {/*BSや抽選所など特別なマークを定義*/}
                            <SpecialMarks {...{screenHookHeight}}/>

                            {storesInfoData.map((storeInfo) => {
                                    const point = points.find((temp) => temp.areaNum == storeInfo.areaNum);
                                    const eachCongestion = congestionData.find((temp) => temp.areaNum == storeInfo.areaNum);
                                    if (!point || !eachCongestion) {
                                        return null;
                                    } else {
                                        return (
                                            <CongestionMark focusedNum={focusedNum} screenHookHeight={screenHookHeight}
                                                            point={point} key={storeInfo.areaNum}
                                                            eachCongestion={eachCongestion} storeInfo={storeInfo}
                                                            handleOnClicked={() => {
                                                                handleImgClicked({...eachCongestion, ...storeInfo});
                                                                makeCenterFocus(point?.x, point?.y);
                                                            }}
                                            />
                                        );
                                    }
                                }
                            )}
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}

export default PanZoomComponent;