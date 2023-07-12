import type {AppProps} from 'next/app'
import React, {createContext, useState} from "react";
import {CssBaseline} from "@mui/material";
import HideScrollBarDiv from "../lib/style/HideScrollBarDiv";
import CongestionDataType from "../lib/type/CongestionDataType";
import congestionDataSample from "../public/data/test/congestionDataSample.json";
import {SessionProvider} from "next-auth/react";
import {Amplify} from "aws-amplify";
import awsmobile from "@/src/aws-exports";


Amplify.configure(awsmobile)



function MyApp({Component, pageProps}: AppProps) {
    const [congestionData, setCongestionData] = useState<CongestionDataType[]>(congestionDataSample);
    return (
        <>
            <HideScrollBarDiv>
                <SessionProvider session={pageProps.session}>
                    <CssBaseline/>
                    <Component {...pageProps} />
                </SessionProvider>
            </HideScrollBarDiv>
        </>
    );
}

export default MyApp
