import type {AppProps} from 'next/app'
import React, {createContext, useState} from "react";
import {CssBaseline} from "@mui/material";
import HideScrollBarDiv from "../lib/style/HideScrollBarDiv";
import CongestionDataType from "../lib/type/CongestionDataType";
import congestionDataSample from "../public/data/test/congestionDataSample.json";
import {SessionProvider} from "next-auth/react";
import {Amplify} from "aws-amplify";


Amplify.configure({
    "aws_project_region": process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
    "aws_appsync_graphqlEndpoint": process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
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
