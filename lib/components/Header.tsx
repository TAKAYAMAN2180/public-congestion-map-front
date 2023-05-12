import {
    AppBar,
    Box, Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import theme from "../theme";
import React, {FC, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuDrawer from "./MenuDrawer";
import SearchDrawer from "./SearchDrawer";
import SearchIcon from "../../public/img/store-search.svg";
import Hamburger from 'hamburger-react'

const Header: FC = () => {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [isSearchBoxOpen, setIsSearchBoxOpen] = useState<boolean>(false);

    const handleSearchIconClicked = (event: any) => {
        event.preventDefault();
        setIsListOpen(false);
        setIsSearchBoxOpen(true);
    }

    const handleCloseIconClicked = (event: any) => {
        event.preventDefault();
        setIsListOpen(false);
        setIsSearchBoxOpen(false);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" sx={{padding: 0, zIndex: 1000, height: "70px"}}>
                    <Toolbar sx={{padding: 1}}>
                        <Box sx={{display: "flex", width: "100%"}}>
                            <Box sx={{height: "100%", width: "auto", flexGrow: 0}}>
                                <IconButton
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Hamburger toggled={isListOpen} toggle={setIsListOpen} size={20}/>
                                </IconButton>
                            </Box>
                            {/*//TODO:この幅に応じて表示させる画像を変化させる*/}
                            <Box sx={{height: "auto", flexGrow: 1}}>
                                <div style={{display: "flex", justifyContent: "center", height: 60}}>
                                    {/*<div style={{display: "block", height: "100%"}}></div>*/}
                                    <img src={"/img/header2.webp"} alt={"Header Image"} placeholder={"blur"}
                                         style={{height: "90%", width: "100%", objectFit: "contain"}}/>
                                </div>
                            </Box>
                            <Box sx={{height: "100%", width: "auto", flexGrow: 0, padding: "6px 0"}}>
                                {isSearchBoxOpen ?
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="search-appbar"
                                        aria-haspopup="true"
                                        onClick={handleCloseIconClicked}
                                        color="inherit"
                                    >
                                        <CloseIcon/>
                                    </IconButton> : <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleSearchIconClicked}
                                        color="inherit"
                                    >
                                        <SearchIcon height={24} width={24}/>
                                    </IconButton>}
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
                <MenuDrawer {...{isListOpen, handleCloseIconClicked}}/>
                <SearchDrawer {...{isSearchBoxOpen, handleCloseIconClicked}}/>
            </ThemeProvider>
        </>
    );
}

export default Header;