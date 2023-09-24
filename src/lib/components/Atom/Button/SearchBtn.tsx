import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

const SearchBtn = ({handleSearchBtnClick}: { handleSearchBtnClick: () => Promise<void> }) => {
    return (
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
    );
}

export default SearchBtn;