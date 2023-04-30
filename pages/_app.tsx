import type {AppProps} from 'next/app'
import React from "react";
import {CssBaseline} from "@mui/material";
import HideScrollBarDiv from "../lib/style/HideScrollBarDiv";

function MyApp({Component, pageProps}: AppProps) {
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
