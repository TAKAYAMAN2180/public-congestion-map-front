import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {useWindowSize} from "../hooks/useWindowSize";
import StoresInfoType from "../type/StoresInfoType";
import StorePaneInfoType from "../type/StorePaneInfoType";

import congestionDataSample from "../../public/data/congestionDataSample.json";
import CongestionDataType from "../type/CongestionDataType";

//TODO:座標のデータを入れたものを作る
const points = [
    {areaNum: 1, x: 500, y: 500},
    {areaNum: 2, x: 600, y: 600},
    {areaNum: 3, x: 700, y: 700},
    {areaNum: 4, x: 850, y: 350},
    {areaNum: 5, x: 900, y: 350},
    {areaNum: 6, x: 950, y: 350},
];

type Borders = {
    leftXBoarder: number;
    rightXBoarder: number;
    topYBoarder: number;
    bottomYBoarder: number;
}

type Props = {
    storePaneInfoSetter: Dispatch<SetStateAction<StorePaneInfoType | null>>
    targetStoresInfo: StoresInfoType[];
};


const PanZoomComponent: FC<Props> = ({storePaneInfoSetter,targetStoresInfo}: Props) => {
    const [screenHookWidth, screenHookHeight] = useWindowSize();
    const movableRef = useRef<any>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);

    const storesInfoData: StoresInfoType[] = targetStoresInfo;
    const congestionData: CongestionDataType[] = congestionDataSample;


    const handleImgClicked = (index: number, congestionLevel: 0 | 1 | 2 | 3) => {
        const storePaneInfoTemp: StorePaneInfoType = {
            focusedAreaNum: index,
            congestionLevel: congestionLevel
        };

        storePaneInfoSetter(storePaneInfoTemp);
    }

    const getBoarders = (scale: number): Borders => {
        const innerWidthSize = window.innerWidth;
        const innerHeightSize = window.innerHeight;

        /*
        console.log("image-width:" + imgRef.current!.clientWidth + " / image-height:" + imgRef.current!.clientHeight);
        console.log("screen-width:" + innerWidthSize + " / screen-height:" + innerHeightSize);
         */

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
            //　スマホなどで小さく表示されるとき
            leftXBoarder = ((imgRef.current!.clientWidth - innerWidthSize) / 2);
            rightXBoarder = -(imgRef.current!.clientWidth * scale - (leftXBoarder + innerWidthSize));
            topYBoarder = 0;
            bottomYBoarder = innerHeightSize - imgRef.current!.clientHeight * scale;
        }
        //console.log("leftXBoarder:" + leftXBoarder + " / rightXBoarder:" + rightXBoarder + " / topYBoarder:" + topYBoarder + " / bottomYBoarder:" + bottomYBoarder);

        return {leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder};

    };

    const handleStop = (e: any) => {

        let {positionX, positionY, scale} = e.state;

        const {leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder} = getBoarders(scale);
        //alert(`x:${positionX}, y:${positionY}, scale: ${scale}, screenHeight: ${innerHeightSize},screenWidth: ${innerWidthSize}`);
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
                maxScale={2.5}

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
                            src="/img/campusMap.svg"
                            //src="https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg"
                            alt="test 2"
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
                            {storesInfoData.map((value) => {
                                    const point = points.find((temp) => temp.areaNum == value.areaNum)
                                    const eachCongestion = congestionData.find((temp) => temp.areaNum == value.areaNum)
                                    if (!point||!eachCongestion) {
                                        return null;
                                    } else {
                                        return (
                                            // Imageタグにすると画質が劣化するので、imgタグで対応
                                            <img src={`/img/marks/congestion${eachCongestion.congestion}.webp`} alt={"busy"}
                                                 key={value.areaNum}
                                                 onClick={() => {
                                                     const myZeroToThree: 0 | 1 | 2 | 3 = eachCongestion.congestion as 0 | 1 | 2 | 3;
                                                     handleImgClicked(value.areaNum, myZeroToThree);
                                                 }}
                                                 width={(25 / 1000) * screenHookHeight}
                                                 height={(25 / 1000) * screenHookHeight}

                                                 style={{
                                                     position: "absolute",
                                                     top: `${(screenHookHeight / 1000) * point?.y}px`,
                                                     left: `${(screenHookHeight / 1000) * point?.x}px`,
                                                     zIndex: 1,
                                                     boxShadow: "0 0 4px gray",
                                                     pointerEvents: "auto",
                                                     borderRadius: "50%"
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