import {AppBar, Box, ThemeProvider, Toolbar} from "@mui/material";
import theme from "@/src/lib/style/theme";
import React, {Dispatch, FC, SetStateAction, useState} from "react";
import MenuDrawer from "./Drawer/MenuDrawer";
import SearchDrawer from "./Drawer/SearchDrawer";
import MenuBtn from '../Atom/Button/MenuBtn'
import StoresInfoType from "@/src/lib/type/StoresInfoType";
import SearchDrawerBtn from "../Atom/Button/SearchDrawerBtn";
import BannerLogo from "../Atom/Image/BannerLogo";

type Props = {
    setStoresInfo?: Dispatch<SetStateAction<StoresInfoType[]>>;
    isMapPage: boolean;
}


const Header: FC<Props> = ({setStoresInfo, isMapPage}: Props) => {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);

    const handleSearchIconClicked = () => {
        setIsListOpen(false);
        setIsSearchBoxOpen(true);
    }

    const handleMenuClicked = () => {
        setIsSearchBoxOpen(false);
        setIsListOpen(true);
    }

    const handleCloseIconClicked = () => {
        setIsListOpen(false);
        setIsSearchBoxOpen(false);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" sx={{padding: 0, zIndex: 2000, height: "70px"}}>
                    <Toolbar sx={{padding: "8px"}}>
                        <Box sx={{display: "flex", width: "100%", height: "70px"}}>
                            <Box sx={{
                                height: "100%",
                                width: "auto",
                                padding: "6px 0"
                            }}>
                                <MenuBtn onToggleHandle={toggled => {
                                    if (toggled) {
                                        // open a menu
                                        handleMenuClicked();
                                    } else {
                                        // close a menu
                                        handleCloseIconClicked();
                                    }
                                }} toggled={isListOpen}/>
                            </Box>
                            <Box sx={{height: 70, width: 'calc(100% - 60px - 58px)'}}>
                                <BannerLogo/>
                            </Box>
                            <Box sx={{height: 70, width: "60px"}}>
                                {isMapPage && <SearchDrawerBtn {...{
                                    isSearchBoxOpen,
                                    handleCloseIconClicked,
                                    handleSearchIconClicked
                                }}/>}
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <MenuDrawer {...{isListOpen, handleCloseIconClicked}}/>
                {isMapPage && setStoresInfo != undefined &&
                    <SearchDrawer {...{isSearchBoxOpen, handleCloseIconClicked, setStoresInfo}}/>
                }
            </ThemeProvider>
        </>
    );
}
export default Header;