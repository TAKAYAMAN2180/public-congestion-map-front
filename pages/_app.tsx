import type {AppProps} from 'next/app'
import React, {createContext, useState} from "react";
import {CssBaseline} from "@mui/material";
import HideScrollBarDiv from "../lib/style/HideScrollBarDiv";
import CongestionDataType from "../lib/type/CongestionDataType";
import congestionDataSample from "../public/data/congestionDataSample.json";

function MyApp({Component, pageProps}: AppProps) {
    const [congestionData, setCongestionData] = useState<CongestionDataType[]>(congestionDataSample);
    return (
        <>
            <HideScrollBarDiv>
                <CssBaseline/>
                <Component {...pageProps} />
            </HideScrollBarDiv>
        </>
    );
}

export default MyApp
