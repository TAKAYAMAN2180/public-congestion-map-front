import type {AppProps} from 'next/app'
import React, {createContext, useState} from "react";
import {CssBaseline} from "@mui/material";
import HideScrollBarDiv from "../lib/style/HideScrollBarDiv";
import CongestionDataType from "../lib/type/CongestionDataType";
import congestionDataSample from "../public/data/test/congestionDataSample.json";
import {SessionProvider} from "next-auth/react";
import {Amplify} from "aws-amplify";
import HEAD from "next/head";
import GoogleAnalytics from "@/lib/GoogleAnalytics";

function MyApp({Component, pageProps}: AppProps) {
    const [congestionData, setCongestionData] = useState<CongestionDataType[]>(congestionDataSample);
    return (
        <>
            <HEAD>
                <link rel="icon" href={"/img/favicon.png"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <meta name="author" content="TAKAYAMA HAYATO" />
                <title>BKC祭典混雑マップ</title>
            </HEAD>
            <GoogleAnalytics />
            <HideScrollBarDiv>
                <SessionProvider session={pageProps.session}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </SessionProvider>
            </HideScrollBarDiv>
            {/*
            Copyright (c) 2023 TAKAYAMA HAYATO
            Released under the MIT license
            https://opensource.org/licenses/mit-license.php
            */}
        </>
    );
}

export default MyApp
