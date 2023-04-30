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
import MenuIcon from "@mui/icons-material/Menu";
import StyledDrawer from "../style/StyledDrawer";
import MapIcon from "@mui/icons-material/Map";
import LinkIcon from "@mui/icons-material/Link";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import React, {FC, useState} from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

const WhitedDivider = styled(Divider)`
  background-color: rgba(255, 255, 255, 0.5);
  margin: 0 10px;
`

const Header: FC = () => {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);

    const handleMenuIconClicked = (event: any) => {
        event.preventDefault();
        setIsListOpen(true);
    }

    const handleCloseIconClicked = (event: any) => {
        event.preventDefault();
        setIsListOpen(false);
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" sx={{padding: 0, zIndex: 1000, height: "70px"}}>
                    <Toolbar sx={{padding: 0}}>
                        <Box sx={{display: "flex", alignItems: "center", height: "100%"}}>
                            {isListOpen ?
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
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
                                    onClick={handleMenuIconClicked}
                                    color="inherit"
                                >
                                    <MenuIcon/>
                                </IconButton>}

                            <img src={"/header-small.webp"} alt={"Header Image"}
                                 style={{height: "100%", marginLeft: "1rem"}}/>
                        </Box>
                    </Toolbar>
                </AppBar>
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
                        <WhitedDivider/>
                        <ListItemButton key={'Links'}>
                            <ListItemIcon>
                                <LinkIcon sx={{color: "white",}}/>
                            </ListItemIcon>
                            <ListItemText primary={'各種リンク'}/>
                        </ListItemButton>
                        <WhitedDivider/>
                        <ListItemButton key={'Info'}>
                            <ListItemIcon>
                                <HelpOutlineIcon sx={{color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText primary={'困ったときは？'}/>
                        </ListItemButton>
                        <WhitedDivider/>
                        <ListItemButton key={'Explain'}>
                            <ListItemIcon>
                                <LightbulbIcon sx={{color: "white"}}/>
                            </ListItemIcon>
                            <ListItemText primary={'このサイトについて'}/>
                        </ListItemButton>
                        <WhitedDivider/>
                    </List>
                </StyledDrawer>
            </ThemeProvider>
        </>
    );
}

export default Header;