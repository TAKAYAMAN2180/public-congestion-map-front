import SpecialMark from "../Atom/Image/SpecialMark";
import React from "react";

// 値を変更するときについて
// heightを変更するときは、「(90 / 1000) * screenHookHeight」の90の部分を変更
// distanceを変更するときは、「(screenHookHeight / 1000) * 340」の340の部分を変更
const SpecialMarks = ({screenHookHeight}: {screenHookHeight:number}) => {
    return (
        <>
            {/*CSのマーク*/}
            <SpecialMark imgPath={"/img/illustrations/vvvlow_centralstage_illustration.webp"}
                         height={(90 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 340}
                         leftDistance={(screenHookHeight / 1000) * 650}
            />
            {/*BSのマーク*/}
            <SpecialMark imgPath={"/img/illustrations/vbeingstage_illustration.webp"}
                         height={(90 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 640}
                         leftDistance={(screenHookHeight / 1000) * 950}
            />
            {/*抽選所のマーク*/}
            <SpecialMark imgPath={"/img/illustrations/lottery_illustration.webp"}
                         height={(60 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 455}
                         leftDistance={(screenHookHeight / 1000) * 920}
            />
            {/*フリーマーケットのマーク*/}
            <SpecialMark imgPath={"/img/illustrations/vfreemarket_illustration.webp"}
                         height={(90 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 550}
                         leftDistance={(screenHookHeight / 1000) * 1100}
            />
            {/*バス乗り場のマーク*/}
            <SpecialMark imgPath={"/img/illustrations/bus.webp"}
                         height={(50 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 550}
                         leftDistance={(screenHookHeight / 1000) * 700}
            />
            {/*自分の位置のマーク*/}
            <SpecialMark imgPath={"/img/illustrations/location.webp"}
                         height={(60 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 600}
                         leftDistance={(screenHookHeight / 1000) * 700}
            />
        </>
    )
}

export default SpecialMarks;