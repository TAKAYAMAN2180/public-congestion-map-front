import {Backdrop, Box, CircularProgress, IconButton, InputAdornment, ThemeProvider} from "@mui/material";
import React, {Dispatch, SetStateAction, useState} from "react";
import StyledDrawer from "../style/StyledDrawer";
import CustomTextField from "../style/CustomTextField";
import {createTheme} from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import search from "../search"
import StoresInfoType from "../type/StoresInfoType";
import initStoresInfoData from "../../public/data/storesInfoData.json";
import CancelBtn from "./CancelBtn";
import {margin} from "@mui/system";


type Props = {
    isSearchBoxOpen: boolean;
    handleCloseIconClicked: (event: any) => void;
    setStoresInfo: Dispatch<SetStateAction<StoresInfoType[]>>;
}

const subTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    }
});

function reformat(arg: any[]): StoresInfoType[] {
    return arg.map(({areaNum, storeName, food}) => ({areaNum, storeName, food}));
}


//TODO:ここを対象に拡大すると表示がおかしくなるのを解消

const SearchDrawer = ({isSearchBoxOpen, handleCloseIconClicked, setStoresInfo}: Props) => {
    const [textFieldValue, setTextFieldValue] = useState<string>("");
    const [preTextFieldValue, setPreTextFieldValue] = useState<string>("");

    const resetStoresInfo = () => {
        setStoresInfo(initStoresInfoData);
    }

    const handleSearchBtnClick = async () => {
        if (textFieldValue === preTextFieldValue) {
            return;
        } else {
            setPreTextFieldValue(textFieldValue);
            if (textFieldValue === "") {
                resetStoresInfo();
            } else {
                let getData = await search(textFieldValue);
                getData = reformat(getData);
                setStoresInfo(getData);
            }
        }
    }

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
                        {/*<CustomTextField
                            id="input-with-icon-textfield"
                            label="キーワードを入力..."
                            onChange={(event) => {
                                setTextFieldValue(event.currentTarget.value);
                            }}

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
                                            value={selectorValue}
                                            onChange={(event) => {
                                                setSelectorValue(event.target.value);
                                            }}
                                        >
                                            <MenuItem value={"storeName"}>店舗名</MenuItem>
                                            <MenuItem value={"food"}>販売品目</MenuItem>
                                        </Select>
                                    </InputAdornment>
                                ),
                            }}
                            variant="filled"
                        />*/}
                        <CustomTextField
                            id="input-with-icon-textfield"
                            label="キーワードを入力..."
                            onChange={(event) => {
                                setTextFieldValue(event.currentTarget.value);
                            }}
                            value={textFieldValue}
                            variant="filled"

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <CancelBtn onClick={() => {
                                            resetStoresInfo();
                                            setTextFieldValue("");
                                        }}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </ThemeProvider>
                    <div style={{backgroundColor: "rgba(223,223,223,255)"}}>
                        <IconButton
                            aria-label={"search"}
                            onClick={handleSearchBtnClick}

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