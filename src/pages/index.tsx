import React, {useEffect, useState} from 'react';
import PanZoomComponent from "@/src/lib/components/Organisms/PanZoomComponent";
import Header from "@/src/lib/components/Organisms/Header";
import StorePane from "@/src/lib/components/Organisms/Pane/StorePane";
import Image from "next/image";
import initStoresInfoData from "../../public/data/prod/storesInfoData.json";
import StoresInfoType from "@/src/lib/type/StoresInfoType";
import StorePaneType from "@/src/lib/type/StorePaneType";
import {NextPage} from "next";
import {atomPaneState, PaneKindStateEnum} from "@/src/lib/recoilAtom";
import {useRecoilState} from "recoil";
import SpecialMarkPane from "@/src/lib/components/Organisms/Pane/SpecialMarkPane";
import RootPane from "@/src/lib/components/Organisms/Pane/RootPane";


type Position = {
    latitude: number | null,
    longitude: number | null
}

const App: NextPage = () => {
    const [position, setPosition] = useState<Position>({latitude: null, longitude: null});
    const [storesInfo, setStoresInfo] = useState<StoresInfoType[]>(initStoresInfoData);
    const [storePaneData, setStorePaneData] = useState<StorePaneType | null>(null);
    const [paneState, setPaneState] = useRecoilState(atomPaneState);


    useEffect(() => {
        document.addEventListener("touchmove", mobile_no_scroll, {passive: false});
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setPosition({latitude, longitude});
        });
    }, []);

    function mobile_no_scroll(event: any) {
        if (event.touches.length >= 2) {
            event.preventDefault();
        }
    }


    return (
        <>
            <div style={{msOverflowStyle: "none"}}>
                <Header isMapPage={true} {...{setStoresInfo}}/>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <PanZoomComponent targetStoresInfo={storesInfo}
                                      focusedNum={storePaneData?.areaNum}/>
                </div>

                <RootPane/>

                <div style={{
                    position: "fixed",
                    right: 0,
                    bottom: 0,
                    width: "50%",
                    height: "15%",
                    zIndex: 300,
                    pointerEvents: "none",
                }}>

                    <Image src={"/img/congestion_list.webp"} alt={"congestion_list"} fill
                           style={{
                               objectFit: "contain",
                               width: "100%",
                               pointerEvents: "none",
                           }}/>
                </div>
            </div>
        </>
    );
}

export default App;
