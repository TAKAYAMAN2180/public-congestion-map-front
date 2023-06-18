import React from "react";

type SpecialEventProps = {
    imgPath: string;
    height: number;
    topDistance: number;
    leftDistance: number
};

const SpecialMark = ({imgPath, height, topDistance, leftDistance}: SpecialEventProps) => {
    return(
        <img src={imgPath}
            //heightの数字を変えるとサイズが変更
            //topとleftの最後の値を変えると座標が変化
             height={height}
             style={{
                 position: "absolute",
                 top: `${topDistance}px`,
                 left: `${leftDistance}px`,
                 zIndex: 1,
                 filter: "drop-shadow(2px 2px 2px gray)",
                 pointerEvents: "none",
             }}
        />
    )
};

export default SpecialMark;