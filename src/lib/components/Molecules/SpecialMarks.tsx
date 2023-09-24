import SpecialMark from "../Atom/Image/SpecialMark";
import React from "react";
import {SpecialMarkKindEnum} from "@/src/lib/recoilAtom";

// 値を変更するときについて
// heightを変更するときは、「(90 / 1000) * screenHookHeight」の90の部分を変更
// distanceを変更するときは、「(screenHookHeight / 1000) * 340」の340の部分を変更
const SpecialMarks = ({screenHookHeight, centerFocusFunction}: {
    screenHookHeight: number,
    centerFocusFunction: (x: number, y: number) => void
}) => {
    return (
        <>
            {/*CSのマーク*/}
            <SpecialMark imgPath={"/img/illustrations/centralstage_illustration.webp"}
                         description={"セントラルステージ"}
                         height={(90 / 1000) * screenHookHeight}
                         topDistance={340}
                         leftDistance={650}
                         specialMarkKindEnum={SpecialMarkKindEnum.CENTRAL_STAGE}
                         content={"大人気！ステージ企画！あの有名人も登場！？"}
                         contentUrl={"https://google.com"}
                         {...{centerFocusFunction}}
            />
            {/*BSのマーク*/}
            <SpecialMark imgPath={"/img/illustrations/beingstage_illustration.webp"}
                         description={"ビーイングステージ"}
                         height={(80 / 1000) * screenHookHeight}
                         topDistance={650}
                         leftDistance={970}
                         specialMarkKindEnum={SpecialMarkKindEnum.BEING_STAGE}
                         content={"多彩な団体によるステージ企画を実施中！"}
                         contentUrl={"https://google.com"}
                         {...{centerFocusFunction}}
            />
            {/*ラリーの抽選所のマーク*/}
            <SpecialMark imgPath={"/img/illustrations/lottery_illustration.webp"}
                         description={"ラリー企画抽選所"}
                         height={(60 / 1000) * screenHookHeight}
                         topDistance={620}
                         leftDistance={910}
                         specialMarkKindEnum={SpecialMarkKindEnum.LOTTERY}
                         content={"ラリー企画に参加して豪華賞品をゲット！"}
                         contentUrl={"https://google.com"}
                         {...{centerFocusFunction}}
            />
            {/*フリーマーケットのマーク*/}
            <SpecialMark imgPath={"/img/illustrations/freemarket_illustration.webp"}
                         description={"フリーマーケット"}
                         height={(90 / 1000) * screenHookHeight}
                         topDistance={550}
                         leftDistance={1100}
                         specialMarkKindEnum={SpecialMarkKindEnum.FREE_MARKET}
                         content={"フリーマーケットで掘り出し物を見つけよう！"}
                         contentUrl={"https://google.com"}
                         {...{centerFocusFunction}}
            />
            {/*バス乗り場のマーク*/}
            <SpecialMark imgPath={"/img/illustrations/bus.webp"}
                         description={"バス乗り場"}
                         height={(50 / 1000) * screenHookHeight}
                         topDistance={550}
                         leftDistance={700}
                         specialMarkKindEnum={SpecialMarkKindEnum.BUS_STOP}
                         content={"便利なバス位置情報を提供中！"}
                         contentUrl={"https://google.com"}
                         {...{centerFocusFunction}}
            />


            {/*TODO:これは違う箇所に書きたい
            自分の位置のマーク
            <SpecialMark imgPath={"/img/illustrations/location.webp"}
                         height={(60 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 600}
                         leftDistance={(screenHookHeight / 1000) * 700}
            />*/}
        </>
    )
}

export default SpecialMarks;