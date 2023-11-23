import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useWindowSize } from "@/src/lib/hooks/useWindowSize";
import StoresInfoType from "@/src/lib/type/StoresInfoType";
import congestionDataSample from "@/public/data/test/congestionDataSample.json";
import { CongestionDataType } from "@/src/lib/type/CongestionDataType";
import StorePaneType from "@/src/lib/type/StorePaneType";
import SpecialMarks from "@/src/lib/components/Molecules/SpecialMarks";
import CongestionMark from "@/src/lib/components/Atom/Image/CongestionMark";
import { trackingEvent } from "@/src/lib/GoogleAnalystics";
import { useRecoilState } from "recoil";
import {
  atomPaneState,
  AtomPaneStateType,
  PaneKindStateEnum,
} from "@/src/lib/recoilAtom";
import points from "@/src/lib/pointInfos";

//TODO:座標のデータを入れたものを作る
type Borders = {
  leftXBoarder: number;
  rightXBoarder: number;
  topYBoarder: number;
  bottomYBoarder: number;
};

type Props = {
  targetStoresInfo: StoresInfoType[];
  focusedNum: number | null | undefined;
};

const PanZoomComponent: FC<Props> = ({
  targetStoresInfo,
  focusedNum,
}: Props) => {
  const [hasSet, setHasSet] = useState<boolean>(false);
  const [screenHookWidth, screenHookHeight] = useWindowSize();
  const movableRef = useRef<any>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  const storesInfoData: StoresInfoType[] = targetStoresInfo;
  const congestionData: CongestionDataType[] = congestionDataSample;

  const [screenHeight, setScreenHeight] = useState<number>();
  const [paneState, setPaneState] = useRecoilState(atomPaneState);

  const MAX_SCALE = 10;
  const INITIAL_SCALE = 2.5;

  //const [centerPositionX, setCenterPositionX] = useState<number>();
  //const [centerPositionY, setCenterPositionY] = useState<number>();

  useEffect(() => {
    if (!hasSet) {
      let centerPositionX = 0;
      let centerPositionY = 0;

      if (
        !imgRef.current?.clientWidth ||
        !divRef.current?.clientWidth ||
        imgRef.current?.clientWidth == 0 ||
        divRef.current?.clientWidth == 0
      ) {
        /*
                console.log("imgRef:" + !imgRef.current);
                console.log("divRef:" + !divRef.current);
                console.log("divRef:" + !imgRef.current?.clientWidth);
                console.log("divRef:" + !divRef.current?.clientWidth);


                console.log("imgRefclientWidth:" + imgRef.current?.clientWidth);
                console.log("divRefclientWidth:" + divRef.current?.clientWidth);*/
      } else {
        const { leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder } =
          getBoarders(INITIAL_SCALE);
        centerPositionX = (leftXBoarder + rightXBoarder * 1.2) / 2;
        centerPositionY = (topYBoarder + bottomYBoarder) / 2;

        console.log(centerPositionX + "," + centerPositionY);
        movableRef.current.setTransform(
          centerPositionX,
          centerPositionY,
          INITIAL_SCALE,
        );
        setHasSet(true);
      }
    }
  }, [
    imgRef.current,
    divRef.current,
    imgRef.current?.clientWidth,
    divRef.current?.clientWidth,
  ]);

  const handleImgClicked = (getStorePaneData: StorePaneType) => {
    const temp: AtomPaneStateType = {
      paneKindState: PaneKindStateEnum.STORE_PANE,
      identifier: getStorePaneData.areaNum,
      info: getStorePaneData,
    };

    setPaneState(temp);
  };

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
      rightXBoarder = -(
        imgRef.current!.clientWidth * scale -
        divRef.current!.clientWidth
      );
      topYBoarder = 0;
      bottomYBoarder = innerHeightSize - imgRef.current!.clientHeight * scale;
    } else {
      //　スマホなどで横の方が小さく表示されるとき
      leftXBoarder = (imgRef.current!.clientWidth - innerWidthSize) / 2;
      rightXBoarder = -(
        imgRef.current!.clientWidth * scale -
        (leftXBoarder + innerWidthSize)
      );
      topYBoarder = 0;
      bottomYBoarder = innerHeightSize - imgRef.current!.clientHeight * scale;
    }
    console.log(
      "leftXBoarder:" +
        leftXBoarder +
        " / rightXBoarder:" +
        rightXBoarder +
        " / topYBoarder:" +
        topYBoarder +
        " / bottomYBoarder:" +
        bottomYBoarder,
    );

    return { leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder };
  };

  const handleStop = (e: any) => {
    //const innerWidthSize = window.innerWidth;
    //const innerHeightSize = window.innerHeight;

    let { positionX, positionY, scale } = e.state;

    let { leftXBoarder, rightXBoarder, topYBoarder, bottomYBoarder } =
      getBoarders(scale);
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
  };

  const makeCenterFocus = (x: number, y: number) => {
    //console.log(`x-point:${(screenHookHeight / 1000) * point?.x}, y-point:${(screenHookHeight / 1000) * point?.y}`);

    //1.5がMAX_SCALEがいい
    const FOCUS_SCALE = 4.0;

    //中央にフォーカスさせる
    movableRef.current.setTransform(
      -(screenHookHeight / 1000) * x * FOCUS_SCALE +
        divRef.current!.clientWidth / 2,
      -(screenHookHeight / 1000) * y * FOCUS_SCALE + screenHookHeight / 2,
      FOCUS_SCALE,
    );
  };

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
        initialScale={INITIAL_SCALE}
        initialPositionX={0}
        initialPositionY={0}
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
          <div
            style={{
              height: screenHookHeight,
            }}
          >
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
              <SpecialMarks
                centerFocusFunction={makeCenterFocus}
                {...{ screenHookHeight }}
              />

              {storesInfoData.map((storeInfo) => {
                // 点の座標
                const point = points.find(
                  (temp) => temp.areaNum == storeInfo.areaNum,
                );
                // それぞれの混雑情報
                const eachCongestion = congestionData.find(
                  (temp) => temp.areaNum == storeInfo.areaNum,
                );
                if (!point || !eachCongestion) {
                  return null;
                } else {
                  return (
                    <CongestionMark
                      point={point}
                      key={storeInfo.areaNum}
                      eachCongestion={eachCongestion}
                      targetStoreInfo={storeInfo}
                      handleOnClicked={() => {
                        handleImgClicked({ ...eachCongestion, ...storeInfo });
                        makeCenterFocus(point?.x, point?.y);
                        trackingEvent(
                          "touch_storepane",
                          "touch_event",
                          storeInfo.areaNum.toString(),
                        );
                      }}
                    />
                  );
                }
              })}
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default PanZoomComponent;
