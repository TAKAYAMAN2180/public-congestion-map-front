import styled from "styled-components";
import {useEffect, useState} from "react";
import Image from "next/image";
import CancelBtn from "../../Atom/Button/CancelBtn";
import StorePaneType from "@/src/lib/type/StorePaneType";
import CongestionSentence from "../../Atom/CongestionSentence";
import {useWindowSize} from "@/src/lib/hooks/useWindowSize";

const DEFAULT_WIDTH_RATIO = 95;
const DEFAULT_FONT_SIZE = 24;

type StoreDescProps = {
    title: string,
    desc: string | number | undefined,
}

const StoreDescDiv = ({title, desc}: StoreDescProps) => {
    // const [screenHookWidth, screenHookHeight] = useWindowSize();
    const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);

    useEffect(() => {
        if (desc != null) {
            let tempDesc = desc;
            if (typeof tempDesc === "number") {
                tempDesc = tempDesc.toString();
            }

            const contentWidth = getStringWidthCanvas(desc as string, `${DEFAULT_FONT_SIZE}px`);
            const titleWidth = getStringWidthCanvas(title as string, '16px');

            console.log(window.innerWidth * (DEFAULT_WIDTH_RATIO / 100));

            // descに費やせる幅を計算
            // desc.length * DEFAULT_FONT_SIZE→descの文字数×デフォルトのフォントサイズ
            // title.length * 16→titleの文字数×デフォルトのフォントサイズ
            // 8→titleとdescの間のスペース
            // 8→親コンポーネントのpadding
            // 8→marginLeftのサイズ→8px
            // 8→予備
            const validWidth = (window.innerWidth * (DEFAULT_WIDTH_RATIO / 100)) - title.length * 16 - 8 - 8 - 8;

            // 画面幅が狭い場合はフォントサイズを小さくする
            /*if (tempDesc.length * DEFAULT_FONT_SIZE > validWidth) {
                setFontSize(validWidth / tempDesc.length);
            }*/
            //console.log("contentWidth:" + contentWidth + " validWidth:" + validWidth);
            //alert("contentWidth:" + contentWidth + ",validWidth:" + validWidth + ",contentWidth nocavas:" + tempDesc.length * DEFAULT_FONT_SIZE)

            if (tempDesc.length * DEFAULT_FONT_SIZE > validWidth) {
                // alert("validWidth / tempDesc.length:" + (validWidth / tempDesc.length));
                setFontSize(validWidth / tempDesc.length);
            }else {
                setFontSize(DEFAULT_FONT_SIZE);
            }
        }
    }, [desc, title]);
    // descとtitleをトリガーにすること

    return (
        <div style={{textAlign: "center"}}>
            <span style={{fontWeight: "bold", fontSize: "16px"}}>{title}</span>
            <span style={{marginLeft: "8px", fontSize: `${fontSize}px`}}>{desc}</span>
        </div>
    );
}

function getStringWidthCanvas(str: string, font: string) {
    // Canvas要素を作成
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    let value = 0;

    if (context != null) {
        // フォントスタイルを設定
        context.font = font;

        // 文字列の幅を取得
        const metrics = context.measureText(str);
        value = metrics.width;
    }
    //alert("str:"+str+" value:"+value);
    return value;
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