import {AppBar, Box, IconButton, ThemeProvider, Toolbar} from "@mui/material";
import theme from "../theme";
import React, {FC, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuDrawer from "./MenuDrawer";
import SearchDrawer from "./SearchDrawer";
import SearchIcon from "../../public/img/store-search.svg";
import Hamburger from 'hamburger-react';
import Image from "next/image";


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
                        <Box sx={{display: "flex", width: "100%", height: "70px"}}>
                            <Box sx={{
                                height: "100%",
                                width: "auto",
                                flexGrow: 0,
                                padding: "6px 0"
                            }}>
                                <IconButton
                                    size="small"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Hamburger toggled={isListOpen} toggle={setIsListOpen} size={20}/>
                                </IconButton>
                            </Box>
                            {/*//TODO:この幅に応じて表示させる画像を変化させる*/}
                            <Box sx={{height: 70, flexGrow: 1}}>
                                <div style={{
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Image src={"/img/header2.webp"} alt={"Header_Image"} height={48} width={380}
                                           sizes="100vw"
                                           style={{
                                               display: "block",
                                               margin: "0 auto",
                                               objectFit: "contain",
                                               width: '100%',
                                               height: 'auto',
                                           }}/>
                                </div>
                            </Box>
                            <Box sx={{height: "100%", width: "auto", flexGrow: 0}}>
                                <div style={{height: "auto", margin: "6px 0"}}>
                                    {isSearchBoxOpen ?
                                        <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="search-appbar"
                                            aria-haspopup="true"
                                            onClick={handleCloseIconClicked}
                                            color="inherit"
                                            sx={{height: 58}}
                                        >
                                            <CloseIcon/>
                                        </IconButton> : <IconButton
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleSearchIconClicked}
                                            color="inherit"
                                            sx={{height: 58}}
                                        >
                                            <SearchIcon height={24} width={24}/>
                                        </IconButton>}
                                </div>
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