import Hamburger from "hamburger-react";
import {IconButton} from "@mui/material";
import React from "react";

const MenuBtn = ({onToggleHandle, toggled}: { onToggleHandle: (arg0: boolean) => void, toggled: boolean }) => {
    return (
        <IconButton
            size="small"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
        >
            <Hamburger toggled={toggled} size={20} onToggle={onToggleHandle}/>
        </IconButton>
    );
}

export default MenuBtn;