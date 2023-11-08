import SpecialMarkPaneType from "@/src/lib/type/SpecialMarkPaneType";
import {useWindowSize} from "@/src/lib/hooks/useWindowSize";
import {useEffect, useState} from "react";


const SpecialMarkDescDiv = ({desc}: { desc: string | number | undefined }) => {
    const DEFAULT_WIDTH_RATIO = 95;
    const DEFAULT_FONT_SIZE = 24;

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
            const validWidth = screenHookWidth * (DEFAULT_WIDTH_RATIO / 100) - 16 - 8;

            // 画面幅が狭い場合はフォントサイズを小さくする
            if ((tempDesc.length * DEFAULT_FONT_SIZE > validWidth)) {
                setFontSize(validWidth / tempDesc.length);
            }
        }
    }, [screenHookWidth]);

    return (
        <div style={{textAlign: "center"}}>
            <span style={{fontSize: `${fontSize}px`}}>{desc}</span>
        </div>
    );
}

const SpecialMarkUrlDiv = ({url}: { url: string }) => {
    const DEFAULT_WIDTH_RATIO = 95;
    const DEFAULT_FONT_SIZE = 12;

    const [screenHookWidth, screenHookHeight] = useWindowSize();
    const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
    const LEAD_SENTENCE = "→ 詳しくはここをクリック！"

    const desc = LEAD_SENTENCE;

    useEffect(() => {
        if (desc != null) {
            let tempDesc = desc;

            // descに費やせる幅を計算
            // desc.length * DEFAULT_FONT_SIZE→descの文字数×デフォルトのフォントサイズ
            // title.length * 16→titleの文字数×デフォルトのフォントサイズ
            // 16→titleとdescの余白
            // 8→親コンポーネントのpadding
            const validWidth = screenHookWidth * (DEFAULT_WIDTH_RATIO / 100) - 16 - 8;

            // 画面幅が狭い場合はフォントサイズを小さくする
            if ((tempDesc.length * DEFAULT_FONT_SIZE > validWidth)) {
                setFontSize(validWidth / tempDesc.length);
            }
        }
    }, [screenHookWidth]);

    return (
        <div style={{textAlign: "center"}}>
            <a href={url} style={{fontSize: `${fontSize}px`}}>{desc}</a>
        </div>
    );
}


const SpecialMarkPane = ({specialMarkPaneData}: { specialMarkPaneData: SpecialMarkPaneType }) => {
    return (
        <>
            <div style={{fontSize: 30}}>
                <div style={{textAlign: "center", fontWeight: "bold", fontSize: "2rem"}}>
                    {specialMarkPaneData.title}
                </div>
                <SpecialMarkDescDiv desc={specialMarkPaneData.content}/>
                {specialMarkPaneData.url && <SpecialMarkUrlDiv url={specialMarkPaneData.url}/>}
            </div>
        </>
    );
}

export default SpecialMarkPane;