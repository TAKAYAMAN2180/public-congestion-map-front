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

Amplify.configure({
    "aws_project_region": process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    "aws_appsync_graphqlEndpoint": process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": process.env.NEXT_PUBLIC_COGNITO_API_KEY
})



function MyApp({Component, pageProps}: AppProps) {
    const [congestionData, setCongestionData] = useState<CongestionDataType[]>(congestionDataSample);
    return (
        <>
            <HEAD>
                <link rel={"icon"} href={"/img/favicon.png"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <title>BKC祭典混雑マップ</title>
            </HEAD>
            <GoogleAnalytics />
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
