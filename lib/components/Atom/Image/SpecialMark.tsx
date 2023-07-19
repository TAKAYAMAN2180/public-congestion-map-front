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

const StyledDiv = styled.div`
  font-size: 0.3vw;
  white-space: nowrap;
  font-weight: 1000;

  text-shadow: 0.1vw 0.1vw 0.1vw white, -0.1vw -0.1vw 0.1vw white,
  -0.1vw 0.1vw 0.1vw white,  0.1vw -0.1vw 0.1vw white,
  0.1vw 0px 0.1vw white, -0.1vw -0px 0.1vw white,
  0px 0.1vw 0.1vw white,  0px -0.1vw 0.1vw white;
`

const SpecialMark = ({description, imgPath, height, topDistance, leftDistance}: SpecialEventProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [cssFontSize, setCssFontSize] = useState<number>(0);
    const [cssStyle, setCssStyle] = useState<React.CSSProperties>();

    useEffect(() => {
        if (height != 0 && description != undefined) {
            //window.alert(`calc((${height}/10)/${description?.length})`);
            setCssFontSize((height)/description.length);
        }
    }, [height, description]);

    /*    useEffect(() => {
            if (cssFontSize != "" || cssFontSize) {
                console.log(cssFontSize);
                setCssStyle({
                    whiteSpace: "nowrap",
                    fontWeight: 1000,
                    textShadow: "0.1vw 0.1vw 0.1vw white, -0.1vw -0.1vw 0.1vw white, -0.1vw 0.1vw 0.1vw white, 0.1vw -0.1vw 0.1vw white, 0.1vw 0px 0.1vw white, -0.1vw -0px 0.1vw white, 0px 0.1vw 0.1vw white, 0px -0.1vw 0.1vw white",
                    fontSize: cssFontSize,
                });
                console.log("css↓");
                console.log(cssStyle);
            }
        }, [cssFontSize]);*/

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
            {/*<StyledDiv length={height}>{description}</StyledDiv>*/}
            {/*<Box width={"100%"} ref={ref}>
               <span style={{fontSize: `${ref.current?.offsetWidth}/${description?.length}`}}>{description}</span>
            </Box>*/}
            {description && <div style={{
                whiteSpace: "nowrap",
                fontWeight: 900,
                textShadow: "0.1vw 0.1vw 0.1vw white, -0.1vw -0.1vw 0.1vw white, -0.1vw 0.1vw 0.1vw white, 0.1vw -0.1vw 0.1vw white, 0.1vw 0px 0.1vw white, -0.1vw -0px 0.1vw white, 0px 0.1vw 0.1vw white, 0px -0.1vw 0.1vw white",
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