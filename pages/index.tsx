import React, {useEffect, useState} from 'react';
import PanZoomComponent from "../lib/components/PanZoomComponent";
import Header from "../lib/components/Header";
import HEAD from "next/head"
import StorePane from "../lib/components/StorePane";
import StorePaneInfoType from "../lib/type/StorePaneInfoType";
import Image from "next/image";

const App = () => {
    const [storePaneInfo, setStorePaneInfo] = useState<StorePaneInfoType | null>(null);
    const [isStorePaneVisible, setIsStorePaneVisible] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener("touchmove", mobile_no_scroll, {passive: false});
    }, []);

    useEffect(() => {
        if (storePaneInfo != null) {
            setIsStorePaneVisible(true);
        }
    }, [storePaneInfo])

    function mobile_no_scroll(event: any) {
        if (event.touches.length >= 2) {
            event.preventDefault();
        }
    }

    return (
        <>
            <HEAD>
                <link rel={"icon"} href={"/favicon.png"}/>
            </HEAD>

            <div style={{msOverflowStyle: "none"}}>
                <Header/>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <PanZoomComponent storePaneInfoSetter={setStorePaneInfo}/>
                </div>

                {storePaneInfo != null &&
                    <StorePane visible={isStorePaneVisible}
                               visibleSetter={setIsStorePaneVisible}
                               storePaneInfo={storePaneInfo}/>
                }

                <div style={{
                    position: "fixed",
                    right: 0,
                    bottom: 0,
                    width: "50%",
                    height: "15%",
                    zIndex: 300,

                }}>
                    <Image src={"/img/congestion_list2.webp"} alt={"congestion_list"} fill
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
