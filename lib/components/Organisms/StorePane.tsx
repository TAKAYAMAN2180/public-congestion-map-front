import styled from "styled-components";
import {Box, Grow} from "@mui/material";
import {useEffect, useState} from "react";
import Image from "next/image";
import CancelBtn from "../Atom/Button/CancelBtn";
import StorePaneType from "@/lib/type/StorePaneType";
import CongestionSentence from "../Atom/CongestionSentence";
import {useWindowSize} from "@/lib/hooks/useWindowSize";

// storepaneの幅の割合(%)
const DEFAULT_WIDTH_RATIO = 95;
const DEFAULT_FONT_SIZE = 24;

type Props = {
    storePaneData: StorePaneType | null;
    handleClosed: (event?: any) => void;
};


const FixedBox = styled(Box)`
  display: block;
  height: auto;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px auto;
  padding: 5px;
  opacity: 0.92;
  background-color: #ffffff; // お好みの背景色に変更
  width: ${DEFAULT_WIDTH_RATIO}%;
  max-width: 550px;
`;

type StoreDescProps = {
    title: string,
    desc: string | number | undefined,
}


const StoreDescDiv = ({title, desc}: StoreDescProps) => {
    const [screenHookWidth, screenHookHeight] = useWindowSize();
    const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);

    useEffect(() => {
        if (desc != null) {
            let tempDesc = desc;
            if (typeof tempDesc === "number") {
                tempDesc = tempDesc.toString();
            }

            // descに費やせる幅を計算
            // desc.length * DEFAULT_FONT_SIZE→descの文字数×デフォルトのフォントサイズ
            // title.length * 16→titleの文字数×デフォルトのフォントサイズ
            // 16→titleとdescの余白
            // 8→親コンポーネントのpadding
            const validWidth = screenHookWidth * (DEFAULT_WIDTH_RATIO / 100) - title.length * 16 - 16 - 8;

            // 画面幅が狭い場合はフォントサイズを小さくする
            if ((tempDesc.length * DEFAULT_FONT_SIZE > validWidth)) {
                setFontSize(validWidth / tempDesc.length);
            }
        }
    }, [screenHookWidth]);

    return (
        <div style={{textAlign: "center"}}>
            <span style={{fontWeight: "bold"}}>{title}</span>
            <span style={{marginLeft: "0.5rem", fontSize: `${fontSize}px`}}>{desc}</span>
        </div>
    );
}

const StorePane = ({storePaneData, handleClosed}: Props) => {
    const [isStorePaneVisible, setIsStorePaneVisible] = useState<boolean>(false);

    useEffect(() => {
        if (storePaneData == null) {
            setIsStorePaneVisible(false);
        } else {
            setIsStorePaneVisible(true);
        }
    }, [storePaneData]);

    return (
        <>
            {storePaneData != null ?
                <Grow in={isStorePaneVisible}>
                    <div style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 400,
                    }}>
                        <FixedBox sx={{boxShadow: 3}} borderRadius={3}>
                            <CancelBtn onClick={() => {
                                handleClosed()
                            }}/>

                            <div style={{textAlign: "center", pointerEvents: "none"}}>
                                <Image src={`/img/marks/congestion${storePaneData?.congestionLevel}.webp`}
                                       alt={"congestion_level"} height={32} width={32}
                                       style={{position: "relative", top: 6}}/>
                                <CongestionSentence congestionLevel={storePaneData?.congestionLevel}/>
                            </div>
                            <StoreDescDiv title={"店舗名"} desc={storePaneData?.storeName}/>
                            <StoreDescDiv title={"販売品目"} desc={storePaneData?.food}/>
                            <StoreDescDiv title={"区画番号"} desc={storePaneData?.areaNum}/>
                            <div style={{
                                textAlign: "center",
                                position: "absolute",
                                right: 15,
                                top: "75%",
                                color: "#696969"
                            }}>
                                <div style={{fontSize: 10, marginBottom: -5}}>更新時間</div>
                                <div>{storePaneData?.updateTime}</div>
                            </div>
                        </FixedBox>
                    </div>
                </Grow> : <></>
            }
        </>
    )
}

export default StorePane;