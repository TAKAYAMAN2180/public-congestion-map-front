import type {AppProps} from 'next/app'
import React, {createContext, useState} from "react";
import {CssBaseline} from "@mui/material";
import HideScrollBarDiv from "../lib/style/HideScrollBarDiv";
import CongestionDataType from "../lib/type/CongestionDataType";
import congestionDataSample from "../public/data/test/congestionDataSample.json";
import {SessionProvider} from "next-auth/react";
import {Amplify} from "aws-amplify";
import awsmobile from "@/src/aws-exports";


Amplify.configure({
    "aws_project_region": "ap-northeast-1",
    "aws_appsync_graphqlEndpoint": "https://u7s7l5cvmrcthlqj6zgwnm6toa.appsync-api.ap-northeast-1.amazonaws.com/graphql",
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": process.env.COGNITO_API_KEY
})



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
