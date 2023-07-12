import {List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import LinkIcon from "@mui/icons-material/Link";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import StyledDrawer from "../../../style/StyledDrawer";
import StyledWhiteDivider from "../../Atom/StyledWhiteDivider";
import React from "react";
import SideDrawerBtn from "../../Molecules/SideDrawerBtn";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import storepage from "../../../../pages/storepage";

type Props = {
    isListOpen: boolean;
    handleCloseIconClicked: (event: any) => void;
}

const MenuDrawer = ({isListOpen, handleCloseIconClicked}: Props) => {
    return (
        <>
            <StyledDrawer
                anchor="left"
                open={isListOpen}
                onClose={handleCloseIconClicked}
            >
                <div style={{height: 70}}/>
                <List>
                    <SideDrawerBtn text={'混雑マップ'} key={'Map'} SvgIcon={MapIcon} page={"/"}/>
                    {/*<SideDrawerBtn text={'各種リンク'} key={'Links'} SvgIcon={LinkIcon}/>*/}
                    {/*<SideDrawerBtn text={'困ったときは？'} key={'Info'} SvgIcon={HelpOutlineIcon}/>*/}
                    {/*<SideDrawerBtn text={'このサイトについて'} key={'Explain'} SvgIcon={LightbulbIcon}/>*/}
                    <SideDrawerBtn text={'出店者向けページ'} key={'StorePage'} SvgIcon={AdminPanelSettingsIcon} page={"/storepage"}/>
                </List>
            </StyledDrawer>
        </>
    );
}

export default MenuDrawer;