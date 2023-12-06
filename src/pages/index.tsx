import React, { useEffect, useMemo, useState } from "react";
import PanZoomComponent from "@/src/lib/components/Organisms/PanZoomComponent";
import Header from "@/src/lib/components/Organisms/Header";
import StorePane from "@/src/lib/components/Organisms/Pane/StorePane";
import Image from "next/image";
import initStoresInfoData from "../../public/data/prod/storesInfoData.json";
import StoresInfoType from "@/src/lib/type/StoresInfoType";
import StorePaneType from "@/src/lib/type/StorePaneType";
import { GetStaticProps, NextPage } from "next";
import {
  atomMessageState,
  atomPaneState,
  PaneKindStateEnum,
} from "@/src/lib/recoilAtom";
import { useRecoilState } from "recoil";
import RootPane from "@/src/lib/components/Organisms/Pane/RootPane";
import { CongestionDataType } from "@/src/lib/type/CongestionDataType";
import { Grow } from "@mui/material";

type Position = {
  latitude: number | null;
  longitude: number | null;
};

const App: NextPage<Props> = (props) => {
  const [position, setPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });
  const [storesInfo, setStoresInfo] =
    useState<StoresInfoType[]>(initStoresInfoData);
  const [storePaneData, setStorePaneData] = useState<StorePaneType | null>(
    null,
  );
  const [paneState, setPaneState] = useRecoilState(atomPaneState);
  const [messageState, setMessageState] = useRecoilState(atomMessageState);
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [isOK, setIsOK] = useState<boolean>(false);

  useEffect(() => {
    if (messageState != null && messageState != "") {
      setIsMessageOpen(true);
      setIsOK(true);
      setTimeout(() => {
        setIsMessageOpen(false);
        setIsOK(false);
      }, 8000);
    }else {
        setIsMessageOpen(false);
        setIsOK(false);
    }
  }, [messageState]);

  useEffect(() => {
    document.addEventListener("touchmove", mobile_no_scroll, {
      passive: false,
    });
    // コンポーネントがマウントされたらスクロールを禁止
    window.addEventListener("scroll", disableScroll);
  }, []);

  function mobile_no_scroll(event: any) {
    event.preventDefault();
  }

  const disableScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div style={{ msOverflowStyle: "none" }}>
        <Header isMapPage={true} {...{ setStoresInfo }} />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PanZoomComponent
            targetStoresInfo={storesInfo}
            focusedNum={storePaneData?.areaNum}
            congestionsData={props.congestionDataArray}
          />
        </div>
        {isOK && (
          <div
            style={{
              position: "fixed",
              top: "80px",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grow in={isMessageOpen}>
              <div
                style={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: "1.5rem",
                  maxWidth: "90vw",
                  padding: "0.5rem",
                  zIndex: 1000,
                  color: "white",
                  textAlign: "center",
                  width: `calc(calc(1rem * ${messageState.length}) + 2rem)`,
                }}
              >
                {messageState}
              </div>
            </Grow>
          </div>
        )}

        <RootPane />

        <div
          style={{
            position: "fixed",
            right: 0,
            bottom: 0,
            width: "50%",
            height: "15%",
            zIndex: 300,
            pointerEvents: "none",
          }}
        >
          <Image
            src={"/img/congestion_list.webp"}
            alt={"congestion_list"}
            fill
            style={{
              objectFit: "contain",
              width: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default App;

type Props = {
  congestionDataArray: CongestionDataType[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const response = await fetch(process.env.LAMBDA_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.LAMBDA_API_KEY!,
      },
      body: '{"query": "{ fetchAllCongestions { areaNum congestionLevel updatedAt } }"}',
    });

    const returnCongestionsData: CongestionDataType[] = [];

    const fetchedCongestionsData: {
      areaNum: number;
      congestionLevel: number;
      updatedAt: number;
    }[] = (await response.json()).data.fetchAllCongestions;

    fetchedCongestionsData.forEach((congestionData) => {
      returnCongestionsData.push({
        areaNum: congestionData.areaNum,
        congestionLevel: congestionData.congestionLevel,
        updatedAt: congestionData.updatedAt,
      });
    });

    return {
      props: {
        congestionDataArray: returnCongestionsData,
      },
      revalidate: 30,
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
