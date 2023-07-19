import React from "react";

type SpecialEventProps = {
    description?: string;
    imgPath: string;
    height: number;
    topDistance: number;
    leftDistance: number
};

const SpecialMark = ({description, imgPath, height, topDistance, leftDistance}: SpecialEventProps) => (
    <div style={{
        //heightの数字を変えるとサイズが変更
        //topとleftの最後の値を変えると座標が変化
        position: "absolute",
        top: `${topDistance}px`,
        left: `${leftDistance}px`,
        zIndex: 1,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }}>
        <div style={{
            fontSize: "0.3vw",
            whiteSpace: "nowrap",
            fontWeight: "bold",
            textShadow: "-1px -1px 0 white,1px -1px 0 white,-1px 1px 0 white,1px 1px 0 white"
            /*            overflow: "hidden",
            textOverflow: "ellipsis"*/
        }}>{description}</div>
        <img src={imgPath}
             height={height}
             style={{
                 filter: "drop-shadow(2px 2px 2px gray)",
             }}
        />
    </div>
);

export default SpecialMark;