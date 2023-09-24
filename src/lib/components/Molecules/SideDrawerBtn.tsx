import {ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap} from "@mui/material";
import React from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import StyledWhiteDivider from "@/src/lib/components/Atom/StyledWhiteDivider";
import Link from "next/link";


const SideDrawerBtn = ({text, key, SvgIcon, page}: {
    text: string,
    key: string,
    SvgIcon: OverridableComponent<SvgIconTypeMap> & { muiName: string },
    page: string
}) => {
    return (
        <>
            <Link href={page} style={{textDecoration:"none",color: "white"}}>
                <ListItemButton key={key}>
                    <ListItemIcon>
                        <SvgIcon sx={{color: "white"}}/>
                    </ListItemIcon>
                    <ListItemText primary={text}/>
                </ListItemButton>
            </Link>
            <StyledWhiteDivider/>
        </>
    );
}

export default SideDrawerBtn;