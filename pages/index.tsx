import React, {useState} from 'react';
import PanZoomComponent from "../lib/components/PanZoomComponent";
import {useWindowSize} from "../lib/hooks/useWindowSize";
import Header from "../lib/components/Header";
import HEAD from "next/head"
import StyledFixedBox from "../lib/style/StyledFixedBox";
import styled from "styled-components";

const App = () => {
    const [screenWidth, screenHeight] = useWindowSize();
    const [focusedNum, setFocusedNum] = useState<number | null>(null);

    return (
        <>
            <HEAD>
                <link rel={"icon"} href={"/favicon.png"}/>
            </HEAD>

            <div style={{msOverflowStyle: "none"}}>
                <Header/>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <PanZoomComponent focusedNumSetter={setFocusedNum}/>
                </div>
                {focusedNum != null && <StyledFixedBox focusedNumSetter={setFocusedNum}>
                    {focusedNum}
                </StyledFixedBox>}

            </div>
        </>
    );
}

export default App;
