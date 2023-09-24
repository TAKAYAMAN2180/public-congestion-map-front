import {CongestionDataType} from "@/src/lib/type/CongestionDataType";
import StoresInfoType from "@/src/lib/type/StoresInfoType";
import {useRecoilState} from "recoil";
import {atomPaneState, PaneKindStateEnum} from "@/src/lib/recoilAtom";
import {useEffect, useState} from "react";
import {useWindowSize} from "@/src/lib/hooks/useWindowSize";

type CongestionMarkProps = {
    handleOnClicked: () => void;
    eachCongestion: CongestionDataType;
    targetStoreInfo: StoresInfoType;
    point: {
        areaNum: number,
        x: number,
        y: number
    };
}

// TODO:もっといい作り方があるはず。これだとタッチする毎に再描画されちゃう
const CongestionMark = ({
                            /*描画対象のStoreInfo*/
                            targetStoreInfo,
                            handleOnClicked,
                            eachCongestion,
                            point,
                        }: CongestionMarkProps) => {
    // TODO:これ省略できる
    const [paneState, setPaneState] = useRecoilState(atomPaneState);
    const [opacity, setOpacity] = useState<number>();
    const [screenHookWidth, screenHookHeight] = useWindowSize();


    useEffect(() => {
        if (paneState.paneKindState == PaneKindStateEnum.STORE_PANE) {
            if (paneState.identifier == targetStoreInfo.areaNum) {
                setOpacity(1);
            } else {
                setOpacity(0.4);
            }
        } else if (paneState.paneKindState == PaneKindStateEnum.SPECIAL_MARK) {
            setOpacity(0.4);
        } else {
            setOpacity(1);
        }
    }, [paneState, targetStoreInfo.areaNum]);


    return (
        <img src={`/img/marks/congestion${eachCongestion.congestionLevel}.webp`}
             alt={"congestion situation"}
             key={targetStoreInfo.areaNum}
             onClick={handleOnClicked}
             width={(25 / 1000) * screenHookHeight}
             height={(25 / 1000) * screenHookHeight}

             style={{
                 position: "absolute",
                 top: `${(screenHookHeight / 1000) * point?.y}px`,
                 left: `${(screenHookHeight / 1000) * point?.x}px`,
                 zIndex: 1,
                 boxShadow: "0 0 4px gray",
                 pointerEvents: "auto",
                 borderRadius: "50%",
                 opacity: `${opacity}`
             }}
        />
    )
}

export default CongestionMark;