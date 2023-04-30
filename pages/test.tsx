/*
import React from "react";
import CampusMap from "../lib/components/CampusMap";

const Home: React.FC = () => {
    return (
        <div style={{ height: "100vh"}}>
            <CampusMap />
        </div>
    );
};

export default Home;*/

import React from 'react';
import MyComponent from '../lib/components/Example';
import TestPanZoomComponent from "../lib/components/Past16";
import {useWindowSize} from "../lib/hooks/useWindowSize";

const App = () => {
    const [screenWidth, screenHeight] = useWindowSize();

    return (
        <div style={{
            width: "auto",

            border: "10px solid gray",
            boxSizing: "border-box",

            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TestPanZoomComponent/>
        </div>
    );
}

export default App;
