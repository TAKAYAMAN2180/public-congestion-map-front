import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "../../../../../public/img/store-search.svg";
import React from "react";

type SearchBtnProps = {
  isSearchBoxOpen: boolean;
  handleCloseIconClicked: () => void;
  handleSearchIconClicked: () => void;
};

const SearchDrawerBtn = ({
  isSearchBoxOpen,
  handleCloseIconClicked,
  handleSearchIconClicked,
}: SearchBtnProps) => {
  return (
    <div style={{ height: "auto", margin: "6px" }}>
      {isSearchBoxOpen ? (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="search-appbar"
          aria-haspopup="true"
          onClick={handleCloseIconClicked}
          color="inherit"
          sx={{ height: 58 }}
        >
          <CloseIcon />
        </IconButton>
      ) : (
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleSearchIconClicked}
          color="inherit"
          sx={{ height: 58 }}
        >
          <SearchIcon height={24} width={24} />
        </IconButton>
      )}
    </div>
  );
};

export default SearchDrawerBtn;
