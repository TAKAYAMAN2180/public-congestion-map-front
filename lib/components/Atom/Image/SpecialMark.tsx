import React from "react";
import styled from "styled-components";

type SpecialEventProps = {
    description?: string;
    imgPath: string;
    height: number;
    topDistance: number;
    leftDistance: number
};

const StyledDiv = styled.div`
  font-size: 0.3vw;
  white-space: nowrap;
  font-weight: 1000;

  text-shadow:
          0.1vw 0.1vw 0.1vw white, -0.1vw -0.1vw 0.1vw white,
          -0.1vw 0.1vw 0.1vw white,  0.1vw -0.1vw 0.1vw white,
          0.1vw 0px 0.1vw white, -0.1vw -0px 0.1vw white,
          0px 0.1vw 0.1vw white,  0px -0.1vw 0.1vw white;
`

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
        <StyledDiv>{description}</StyledDiv>
        <img src={imgPath}
             height={height}
             style={{
                 filter: "drop-shadow(2px 2px 2px gray)",
             }}
        />
    </div>
);

export default SpecialMark;