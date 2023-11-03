import {Button, IconButton, Typography} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchBtn = ({handleSearchBtnClick}: { handleSearchBtnClick: () => Promise<void> }) => {
    return (
        <div style={{backgroundColor: "rgba(223,223,223,255)"}}>

            <Button
                aria-label={"search"}
                onClick={handleSearchBtnClick}
                endIcon={<SearchIcon style={{color: "white", fontSize: 35, margin: 0}}/>}
                sx={{
                    margin: "7px 5px",
                    padding: "4px 7px 4px 4px",
                    height: 42,
                    textAlign: "center",
                    boxShadow: 3,
                    backgroundColor: '#990000',
                    '&:hover': {
                        backgroundColor: '#990000',
                    },
                }}>
                <div
                    style={{fontSize: "0.8rem", color: "white", position: "relative", left: "7px"}}>検索
                </div>
            </Button>
        </div>
    );
}

export default SearchBtn;