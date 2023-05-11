import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import LinkIcon from "@mui/icons-material/Link";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StyledDrawer from "../style/StyledDrawer";
import StyledWhiteDivider from "../style/StyledWhiteDivider";
import React from "react";

type Props = {
    isListOpen: boolean;
    handleCloseIconClicked: (event: any) => void;
}

const MenuDrawer = ({isListOpen, handleCloseIconClicked}:Props) => {
    return (
        <>
            <StyledDrawer
                anchor="left"
                open={isListOpen}
                onClose={handleCloseIconClicked}
            >
                <div style={{height: 70}}/>
                <List>
                    <ListItemButton key={'Map'}>
                        <ListItemIcon>
                            <MapIcon sx={{color: "white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={'混雑マップ'}/>
                    </ListItemButton>
                    <StyledWhiteDivider/>
                    <ListItemButton key={'Links'}>
                        <ListItemIcon>
                            <LinkIcon sx={{color: "white",}}/>
                        </ListItemIcon>
                        <ListItemText primary={'各種リンク'}/>
                    </ListItemButton>
                    <StyledWhiteDivider/>
                    <ListItemButton key={'Info'}>
                        <ListItemIcon>
                            <HelpOutlineIcon sx={{color: "white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={'困ったときは？'}/>
                    </ListItemButton>
                    <StyledWhiteDivider/>
                    <ListItemButton key={'Explain'}>
                        <ListItemIcon>
                            <LightbulbIcon sx={{color: "white"}}/>
                        </ListItemIcon>
                        <ListItemText primary={'このサイトについて'}/>
                    </ListItemButton>
                    <StyledWhiteDivider/>
                </List>
            </StyledDrawer>
        </>
    );
}

export default MenuDrawer;