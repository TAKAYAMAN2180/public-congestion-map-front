import styled from "styled-components";
import {Box, Grow} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import CancelBtn from "./CancelBtn";
import StoresInfoType from "../type/StoresInfoType";
import storesInfoData from "../../public/data/storesInfoData.json"
import CongestionDataType from "../type/CongestionDataType";

type Props = {
    congestionData: CongestionDataType;
    visible: boolean;
    visibleSetter: Dispatch<SetStateAction<boolean>>
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
  width: 95%;
  max-width: 550px;
`;

type StoreDescProps = {
    title: string,
    desc: string | number | undefined,
}


const StoreDescDiv = ({title, desc}: StoreDescProps) => {
    return (
        <div style={{textAlign: "center"}}>
            <span style={{fontWeight: "bold"}}>{title}</span>
            <span style={{marginLeft: "0.5em", fontSize: "1.5rem"}}>{desc}</span>
        </div>
    );
}

const StorePane = ({congestionData, visibleSetter, visible}: Props) => {
    const [storeInfo, setStoreInfo] = useState<StoresInfoType>();

    useEffect(() => {
        const getStoreInfo = storesInfoData.find((storeInfo) => storeInfo.areaNum == congestionData.areaNum);
        if (getStoreInfo == null) {
            window.alert("存在しない区画番号が参照されています");
        } else {
            setStoreInfo(getStoreInfo);
        }

    }, [congestionData]);

    const handleIconClicked = (event: any) => {
        event.preventDefault();
        visibleSetter(false);
    }


    return (
        <Grow in={visible}>
            <div style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 400,
            }}>
                <FixedBox sx={{boxShadow: 3}} borderRadius={3}>
                    <CancelBtn onClick={handleIconClicked}/>

                    <div style={{textAlign: "center", pointerEvents: "none"}}>
                        <Image src={`/img/marks/congestion${congestionData.congestionLevel}.webp`}
                               alt={"congestion_level"} height={32} width={32}
                               style={{position: "relative", top: 6}}/>
                        <span style={{fontSize: "1.7rem", marginLeft: "1rem", fontWeight: "bold"}}>
                         {(() => {
                             switch (congestionData.congestionLevel) {
                                 case 0:
                                     return "中止しています";
                                 case 1:
                                     return "空いています";
                                 case 2:
                                     return "少し混雑しています";
                                 case 3:
                                     return "混雑しています";
                             }
                         })()}
                            </span>
                    </div>
                    <StoreDescDiv title={"店舗名"} desc={storeInfo?.storeName}/>
                    <StoreDescDiv title={"販売品目"} desc={storeInfo?.food}/>
                    <StoreDescDiv title={"区画番号"} desc={storeInfo?.areaNum}/>
                    <div style={{textAlign: "center", position: "absolute", right: 15, top: "75%",color:"#696969"}}>
                        <div style={{fontSize: 10, marginBottom: -5}}>更新時間</div>
                        <div>{congestionData.updateTime}</div>
                    </div>
                </FixedBox>
            </div>
        </Grow>
    )
}

export default StorePane;