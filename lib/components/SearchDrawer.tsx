import {
    Box,

    ThemeProvider,
} from "@mui/material";
import React, {MutableRefObject, useEffect, useState} from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CancelBtn from "./CancelBtn";
import StyledDrawer from "../style/StyledDrawer";
import MapIcon from "@mui/icons-material/Map";
import CustomTextField from "../style/CustomTextField";
import LinkIcon from "@mui/icons-material/Link";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SearchBox from "./SearchBox";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import {AccountCircle, VisibilityOff} from "@mui/icons-material";
import styled from "styled-components";
import {createTheme} from "@mui/material/styles";
import TextField from "@mui/material/TextField";


type Props = {
    isSearchBoxOpen: boolean;
    handleCloseIconClicked: (event: any) => void;
}

const CustomSelect = styled(Select)`
  & .MuiSelect-icon {
    left: 0;
    right: auto;
    color: white;
  }
`;
const sub2Theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    }
});


const subTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
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
                <Box sx={{padding: 1, display: "flex", justifyContent: "right", height: 70}}>
                    <ThemeProvider theme={subTheme}>
                        <CustomTextField
                            id="input-with-icon-textfield"
                            label="キーワードを入力"

                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ThemeProvider theme={sub2Theme}>
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
                                                onChange={() => {
                                                    window.alert("変更を探知しました");
                                                }}
                                            >
                                                <MenuItem value={10}>店舗名</MenuItem>
                                                <MenuItem value={20}>販売品目</MenuItem>
                                            </Select>
                                        </ThemeProvider>
                                    </InputAdornment>
                                ),
                            }}
                            variant="filled"
                        />
                    </ThemeProvider>

                </Box>
            </StyledDrawer>
        </>
    );
}

export default SearchDrawer;