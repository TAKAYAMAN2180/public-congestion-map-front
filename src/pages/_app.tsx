import { AppProps } from "next/app";
import React from "react";
import { CssBaseline } from "@mui/material";
import HEAD from "next/head";
import GoogleAnalytics from "@/src/lib/GoogleAnalystics";
import awsmobile from "@/src/graphql/aws-exports";
import { Amplify } from "aws-amplify";
// import "@/src/lib/style/current-location.css";

import { RecoilRoot } from "recoil";

Amplify.configure(awsmobile);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HEAD>
        <link rel="icon" href={"/img/favicon.png"} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="author" content="TAKAYAMA HAYATO" />
        <title>BKC祭典混雑マップ</title>
      </HEAD>
      <GoogleAnalytics />
      <RecoilRoot>
        <CssBaseline />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
