import SpecialMark from "../Atom/Image/SpecialMark";
import React from "react";
import { SpecialMarkKindEnum } from "@/src/lib/recoilAtom";

// 値を変更するときについて
// heightを変更するときは、「(90 / 1000) * screenHookHeight」の90の部分を変更
// distanceを変更するときは、「(screenHookHeight / 1000) * 340」の340の部分を変更
const SpecialMarks = ({
  screenHookHeight,
  centerFocusFunction,
}: {
  screenHookHeight: number;
  centerFocusFunction: (x: number, y: number) => void;
}) => {
  return (
    <>
      {/*CSのマーク*/}
      <SpecialMark
        imgPath={"/img/illustrations/centralstage_illustration.webp"}
        description={"セントラルステージ"}
        height={(50 / 1000) * screenHookHeight}
        topDistance={355}
        leftDistance={720}
        specialMarkKindEnum={SpecialMarkKindEnum.CENTRAL_STAGE}
        content={"大人気！ステージ企画！あの有名人も登場！？"}
        contentUrl={"https://drive.google.com/file/d/1tlS_fhu4hw0OQbGujcEXwQIIpw7UvbAH/view?usp=sharing"}
        {...{ centerFocusFunction }}
      />
      {/*BSのマーク*/}
      <SpecialMark
        imgPath={"/img/illustrations/beingstage_illustration.webp"}
        description={"ビーイングステージ"}
        height={(50 / 1000) * screenHookHeight}
        topDistance={650}
        leftDistance={970}
        specialMarkKindEnum={SpecialMarkKindEnum.BEING_STAGE}
        content={"多彩な団体によるステージ企画を実施中！"}
        contentUrl={"https://drive.google.com/file/d/1XWrXMimkSiksvGLwgxnhNV8I9oABgxQq/view?usp=sharing"}
        {...{ centerFocusFunction }}
      />

      {/*フリーマーケットのマーク*/}
      <SpecialMark
        imgPath={"/img/illustrations/freemarket_illustration.webp"}
        description={"フリーマーケット"}
        height={(50 / 1000) * screenHookHeight}
        topDistance={370}
        leftDistance={1120}
        specialMarkKindEnum={SpecialMarkKindEnum.FREE_MARKET}
        content={"フリーマーケットで掘り出し物を見つけよう！"}
        {...{ centerFocusFunction }}
      />
      {/*バス乗り場のマーク*/}
      <SpecialMark
        imgPath={"/img/illustrations/bus.webp"}
        description={"バス乗り場"}
        height={(50 / 1000) * screenHookHeight}
        topDistance={550}
        leftDistance={700}
        specialMarkKindEnum={SpecialMarkKindEnum.BUS_STOP}
        content={"便利なバス位置情報を提供中！"}
        {...{ centerFocusFunction }}
      />
      {/*総合案内所のマーク*/}
      <SpecialMark
        imgPath={"/img/illustrations/info.webp"}
        description={"総合案内所"}
        height={(50 / 1000) * screenHookHeight}
        topDistance={350}
        leftDistance={850}
        specialMarkKindEnum={SpecialMarkKindEnum.INFO_CENTER}
        content={"困ったときはぜひこちらへ！"}
        {...{ centerFocusFunction }}
      />
      {/*投票所のマーク*/}
      <SpecialMark
        imgPath={"/img/illustrations/voting_station.webp"}
        description={"模擬店投票所"}
        height={(35 / 1000) * screenHookHeight}
        topDistance={570}
        leftDistance={870}
        specialMarkKindEnum={SpecialMarkKindEnum.VOTING_STATION}
        content={"模擬店に投票して立命館グッズをゲットしよう！！"}
        contentUrl={"https://drive.google.com/file/d/1ELN_bDM7-Hbc57yeK8VMmJSxqferUNfr/view?usp=sharing"}
        {...{ centerFocusFunction }}
      />
      {/*休憩所(ユニオンのマーク)*/}
      <SpecialMark
        imgPath={"/img/illustrations/lounge.webp"}
        description={"休憩所"}
        height={(35 / 1000) * screenHookHeight}
        topDistance={480}
        leftDistance={810}
        specialMarkKindEnum={SpecialMarkKindEnum.LOUNGE_UNION}
        content={"ユニオンスクエア1階・2階"}
        {...{ centerFocusFunction }}
      />
      {/*休憩所(リンクのマーク)*/}
      <SpecialMark
        imgPath={"/img/illustrations/lounge.webp"}
        description={"休憩所"}
        height={(35 / 1000) * screenHookHeight}
        topDistance={310}
        leftDistance={1100}
        specialMarkKindEnum={SpecialMarkKindEnum.LOUNGE_LINK}
        content={"リンクスクエア1階"}
        {...{ centerFocusFunction }}
      />
      {/*休憩所(コラ１のマーク)*/}
      <SpecialMark
        imgPath={"/img/illustrations/lounge.webp"}
        description={"休憩所"}
        height={(35 / 1000) * screenHookHeight}
        topDistance={480}
        leftDistance={1120}
        specialMarkKindEnum={SpecialMarkKindEnum.LOUNGE_COLEARNING}
        content={"コラーニングハウスⅠ 1階 C106〜C109"}
        {...{ centerFocusFunction }}
      />

      {/*TODO:これは違う箇所に書きたい
            自分の位置のマーク
            <SpecialMark imgPath={"/img/illustrations/location.webp"}
                         height={(60 / 1000) * screenHookHeight}
                         topDistance={(screenHookHeight / 1000) * 600}
                         leftDistance={(screenHookHeight / 1000) * 700}
            />*/}
    </>
  );
};

export default SpecialMarks;
