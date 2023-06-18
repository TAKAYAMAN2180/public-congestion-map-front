import CongestionDataType from "../../../type/CongestionDataType";
import StoresInfoType from "../../../type/StoresInfoType";

type CongestionMarkProps = {
    focusedNum: number | null | undefined;
    handleOnClicked: () => void;
    screenHookHeight: number;
    eachCongestion: CongestionDataType;
    storeInfo: StoresInfoType;
    point: { areaNum: number, x: number, y: number };
}

// TODO:もっといい作り方があるはず。これだとタッチする毎に再描画されちゃう
const CongestionMark = ({
                            handleOnClicked,
                            focusedNum,
                            storeInfo,
                            eachCongestion,
                            point,
                            screenHookHeight
                        }: CongestionMarkProps) => {
    let opacity: number;
    if (focusedNum == null) {
        opacity = 1;
    } else {
        if (focusedNum == storeInfo.areaNum) {
            opacity = 1;
        } else {
            opacity = 0.4;
        }
    }
    return (
        <img src={`/img/marks/congestion${eachCongestion.congestionLevel}.webp`}
             alt={"congestion situation"}
             key={storeInfo.areaNum}
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