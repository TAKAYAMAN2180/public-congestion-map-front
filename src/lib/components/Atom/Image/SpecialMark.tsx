import React, {useEffect, useRef, useState} from "react";
import {useRecoilState} from "recoil";
import {atomPaneState, AtomPaneStateType, PaneKindStateEnum, SpecialMarkKindEnum} from "@/src/lib/recoilAtom";
import {useWindowSize} from "@/src/lib/hooks/useWindowSize";
import SpecialMarkPaneType from "@/src/lib/type/SpecialMarkPaneType";

type SpecialMarkProps = {
    description: string;
    imgPath: string;
    height: number;
    topDistance: number;
    leftDistance: number;
    specialMarkKindEnum: SpecialMarkKindEnum;
    centerFocusFunction: (x: number, y: number) => void;
    content: string;
    contentUrl: string;
};

const SpecialMark = ({content, contentUrl, description, specialMarkKindEnum, imgPath, height, topDistance, leftDistance, centerFocusFunction}: SpecialMarkProps) => {
    const [cssFontSize, setCssFontSize] = useState<number>(0);
    const [hasClicked, setHasClicked] = useState<boolean>(false);
    const [paneState, setPaneState] = useRecoilState(atomPaneState);
    const [opacity, setOpacity] = useState<number>();
    const [screenHookWidth, screenHookHeight] = useWindowSize();

    const imgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (height != 0 && description != undefined) {
            setCssFontSize(height / description.length);
        }
    }, [height, description]);

    useEffect(() => {
        if (paneState.paneKindState == PaneKindStateEnum.SPECIAL_MARK) {
            if (paneState.identifier == specialMarkKindEnum) {
                setOpacity(1);
            } else {
                setOpacity(0.6);
            }
        } else if (paneState.paneKindState == PaneKindStateEnum.STORE_PANE) {
            setOpacity(0.6);
        } else {
            setOpacity(1);
        }
    }, [paneState, specialMarkKindEnum]);

    return (
        <div style={{
            //heightの数字を変えるとサイズが変更
            //topとleftの最後の値を変えると座標が変化
            position: "absolute",
            top: `${(screenHookHeight / 1000) * topDistance}px`,
            left: `${(screenHookHeight / 1000) * leftDistance}px`,
            zIndex: 1,
            opacity: `${opacity}`,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}

        >
            <div style={{
                whiteSpace: "nowrap",
                fontWeight: 900,
                textShadow: `${height / 40}px ${height / 40}px ${height / 40}px white, -${height / 40}px -${height / 40}px ${height / 40}px white, -${height / 40}px ${height / 40}px ${height / 40}px white, ${height / 40}px -${height / 40}px ${height / 40}px white, ${height / 40}px 0px ${height / 40}px white, -${height / 40}px -0px ${height / 40}px white, 0px ${height / 40}px ${height / 40}px white, 0px -${height / 40}px ${height / 40}px white`,
                fontSize: cssFontSize,
            }}>
                {description}
            </div>
            <img src={imgPath}
                 height={height}
                 ref={imgRef}
                 style={{
                     filter: "drop-shadow(2px 2px 2px gray)",
                     pointerEvents: "auto",
                     WebkitTapHighlightColor: "transparent"
                 }}
                 onClick={() => {
                     if (imgRef.current != null && imgRef.current?.clientWidth != undefined && imgRef.current?.clientHeight) {
                         centerFocusFunction(leftDistance + imgRef.current.clientWidth, topDistance + imgRef.current.clientHeight);
                     } else {
                         centerFocusFunction(leftDistance, topDistance);
                     }

                     const temp: AtomPaneStateType = {
                         paneKindState: PaneKindStateEnum.SPECIAL_MARK,
                         identifier: specialMarkKindEnum,
                         info: {
                             title: description,
                             content: content,
                             url: contentUrl
                         },
                     };

                     setPaneState(temp);
                 }}
            />
        </div>
    );
}

export default SpecialMark;