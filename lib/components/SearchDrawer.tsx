import {Box, IconButton, ThemeProvider} from "@mui/material";
import React, {useState} from "react";
import StyledDrawer from "../style/StyledDrawer";
import CustomTextField from "../style/CustomTextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import {createTheme} from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';

type Props = {
    isSearchBoxOpen: boolean;
    handleCloseIconClicked: (event: any) => void;
}

const subTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    }
});

//TODO:ここを対象に拡大すると表示がおかしくなるのを解消

const SearchDrawer = ({isSearchBoxOpen, handleCloseIconClicked}: Props) => {
    const [value, setValue] = useState<number>();


    return (
        <>
            <StyledDrawer
                anchor="top"
                open={isSearchBoxOpen}
                onClose={handleCloseIconClicked}
            >
                <div style={{height: 70}}/>
                <Box sx={{padding: 1, display: "flex", justifyContent: "right", height: 70, width: "auto"}}>
                    <ThemeProvider theme={subTheme}>
                        <CustomTextField
                            id="input-with-icon-textfield"
                            label="キーワードを入力..."

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                        <Select
                                            sx={{
                                                width: "8rem",
                                                height: "3rem",
                                                marginBottom: "1rem",
                                                fontColor: "black"
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={value}
                                        >
                                            <MenuItem value={10}>店舗名</MenuItem>
                                            <MenuItem value={20}>販売品目</MenuItem>
                                        </Select>
                                    </InputAdornment>
                                ),
                            }}
                            variant="filled"
                        />
                    </ThemeProvider>
                    <div style={{backgroundColor: "rgba(223,223,223,255)"}}>
                        <IconButton
                            aria-label={"search"}
                            sx={{
                                margin: "7px 5px",
                                width: 42,
                                height: 42,
                                textAlign: "center",
                                padding: "4px 0",
                                borderRadius: "50%",
                                boxShadow: 3,
                                backgroundColor: '#990000',
                                '&:hover': {
                                    backgroundColor: '#990000',
                                },
                            }}>
                            <SearchIcon style={{color: "white", fontSize: 35}}/>
                        </IconButton>
                    </div>
                </Box>
            </StyledDrawer>
        </>
    );
}

export default SearchDrawer;