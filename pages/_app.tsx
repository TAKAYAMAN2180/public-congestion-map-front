import type {AppProps} from 'next/app'
import React from "react";
import {CssBaseline} from "@mui/material";
import {SessionProvider} from "next-auth/react";
import HEAD from "next/head";
import { Analytics } from '@vercel/analytics/react';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <HEAD>
                <link rel="icon" href={"/img/favicon.png"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
                <meta name="author" content="TAKAYAMA HAYATO"/>
                <title>BKC祭典混雑マップ</title>
            </HEAD>
            <SessionProvider session={pageProps.session}>
                <CssBaseline/>
                <Component {...pageProps} />
                <Analytics />
            </SessionProvider>
        </>
    );
}

export default MyApp
