import {ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import React from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import StyledWhiteDivider from "../Atom/StyledWhiteDivider";


const SideDrawerBtn = ({text, key, SvgIcon}: {
    text: string,
    key: string,
    SvgIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string }
}) => {
    return (
        <>
            <ListItemButton key={key}>
                <ListItemIcon>
                    <SvgIcon sx={{color: "white"}}/>
                </ListItemIcon>
                <ListItemText primary={text}/>
            </ListItemButton>
            <StyledWhiteDivider/>
        </>
    );
}

export default SideDrawerBtn;