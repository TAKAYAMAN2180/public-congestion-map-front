import styled from "styled-components";
import {useEffect, useState} from "react";
import Image from "next/image";
import CancelBtn from "../../Atom/Button/CancelBtn";
import StorePaneType from "@/src/lib/type/StorePaneType";
import CongestionSentence from "../../Atom/CongestionSentence";
import {useWindowSize} from "@/src/lib/hooks/useWindowSize";
import {useRecoilState} from "recoil";
import RootPane from "@/src/lib/components/Organisms/Pane/RootPane";

const DEFAULT_WIDTH_RATIO = 95;
const DEFAULT_FONT_SIZE = 24;

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

const StorePane = ({storePaneData}: { storePaneData: StorePaneType }) => {

    return (
        <>
            {storePaneData != null &&
                <>
                    <div style={{textAlign: "center", pointerEvents: "none"}}>
                        <Image src={`/img/marks/congestion${storePaneData.congestionLevel}.webp`}
                               alt={"congestion_level"} height={32} width={32}
                               style={{position: "relative", top: 6}}/>
                        <CongestionSentence congestionLevel={storePaneData.congestionLevel}/>
                    </div>
                    <StoreDescDiv title={"店舗名"} desc={storePaneData.storeName}/>
                    {storePaneData.groupName &&
                        <StoreDescDiv title={"団体名"} desc={storePaneData.groupName}/>
                    }
                    <StoreDescDiv title={"販売品目"} desc={storePaneData.food}/>
                    <StoreDescDiv title={"区画番号"} desc={storePaneData.areaNum}/>
                    <div style={{
                        textAlign: "center",
                        position: "absolute",
                        right: 15,
                        top: "75%",
                        color: "#696969"
                    }}>
                        <div style={{fontSize: 10, marginBottom: -5}}>更新時間</div>
                        <div>{storePaneData.updateTime}</div>
                    </div>
                </>
            }
        </>

    )
}

export default StorePane;