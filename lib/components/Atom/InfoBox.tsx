import React, {ReactNode} from "react";
import {Box} from "@mui/material";

const InfoBox = ({title, children}: { title: string, children: ReactNode }) => (
    <Box sx={{bgcolor: "#d3d3d3", padding: "1em", borderRadius: "1em", marginBottom: "1em"}}>
        <div style={{color: "gray", fontSize: "0.7em"}}>{title}</div>
        <div style={{color: "black"}}>
            <span>{children}</span>
        </div>
    </Box>
);

export default InfoBox;