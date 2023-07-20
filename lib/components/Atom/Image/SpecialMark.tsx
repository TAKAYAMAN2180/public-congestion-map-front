import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Box} from "@mui/material";

type SpecialEventProps = {
    description?: string;
    imgPath: string;
    height: number;
    topDistance: number;
    leftDistance: number
};

const SpecialMark = ({description, imgPath, height, topDistance, leftDistance}: SpecialEventProps) => {
    const [cssFontSize, setCssFontSize] = useState<number>(0);

    useEffect(() => {
        if (height != 0 && description != undefined) {
            setCssFontSize(height / description.length);
        }
    }, [height, description]);

    return (
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
            {description && <div style={{
                whiteSpace: "nowrap",
                fontWeight: 900,
                textShadow: `${height / 40}px ${height / 40}px ${height / 40}px white, -${height / 40}px -${height / 40}px ${height / 40}px white, -${height / 40}px ${height / 40}px ${height / 40}px white, ${height / 40}px -${height / 40}px ${height / 40}px white, ${height / 40}px 0px ${height / 40}px white, -${height / 40}px -0px ${height / 40}px white, 0px ${height / 40}px ${height / 40}px white, 0px -${height / 40}px ${height / 40}px white`,
                fontSize: cssFontSize,
            }}>
                {description}
            </div>}
            <img src={imgPath}
                 height={height}
                 style={{
                     filter: "drop-shadow(2px 2px 2px gray)",
                 }}
            />
        </div>
    );
}

export default SpecialMark;