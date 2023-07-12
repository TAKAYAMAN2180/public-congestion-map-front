import {Backdrop, Box, CircularProgress, IconButton, InputAdornment, ThemeProvider} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import StyledDrawer from "../../../style/StyledDrawer";
import SearchIcon from '@mui/icons-material/Search';
import search from "../../../search"
import StoresInfoType from "../../../type/StoresInfoType";
import initStoresInfoData from "../../../../public/data/test/storesInfoData.json";
import CustomTextField from "../../Molecules/CustomTextField";
import SearchBtn from "../../Atom/Button/SearchBtn";


type Props = {
    isSearchBoxOpen: boolean;
    handleCloseIconClicked: (event: any) => void;
    setStoresInfo: Dispatch<SetStateAction<StoresInfoType[]>>;
}

function reformat(arg: any[]): StoresInfoType[] {
    return arg.map(({areaNum, storeName, food}) => ({areaNum, storeName, food}));
}


//TODO:ここを対象に拡大すると表示がおかしくなるのを解消

const SearchDrawer = ({isSearchBoxOpen, handleCloseIconClicked, setStoresInfo}: Props) => {
    const [textFieldValue, setTextFieldValue] = useState<string>("");
    const [preTextFieldValue, setPreTextFieldValue] = useState<string>("");

    useEffect(() => {
        setTextFieldValue("");
        setPreTextFieldValue("");
        resetStoresInfo();
    }, [isSearchBoxOpen]);

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
                variant={"persistent"}
            >
                <div style={{height: 70}}/>
                <Box sx={{padding: 1, display: "flex", justifyContent: "right", height: 70, width: "auto"}}>
                    <CustomTextField textFieldValue={textFieldValue}
                                     handleTextFieldChanged={(event) => {
                                         setTextFieldValue(event.currentTarget.value);
                                     }}
                                     handleCancelBtnClicked={() => {
                                         resetStoresInfo();
                                         setTextFieldValue("");
                                     }}
                    />
                    <SearchBtn {...{handleSearchBtnClick}}/>
                </Box>
            </StyledDrawer>
        </>
    );
}

export default SearchDrawer;