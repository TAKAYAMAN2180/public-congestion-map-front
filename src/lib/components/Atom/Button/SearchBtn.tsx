import {
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";

const SearchBtn = ({
  handleSearchBtnClick,
}: {
  handleSearchBtnClick: () => Promise<void>;
}) => {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div style={{ backgroundColor: "rgba(223,223,223,255)" }}>
      <Button
        aria-label={"search"}
        onClick={async () => {
          setIsSearching(true);
          await handleSearchBtnClick();
          setIsSearching(false);
        }}
        endIcon={
          <SearchIcon style={{ color: "white", fontSize: 35, margin: 0 }} />
        }
        sx={{
          margin: "7px 5px",
          padding: "4px 7px 4px 4px",
          height: 42,
          textAlign: "center",
          boxShadow: 3,
          backgroundColor: "#990000",
          "&:hover": {
            backgroundColor: "#990000",
          },
        }}
      >
        <div
          style={{
            fontSize: "0.8rem",
            color: "white",
            position: "relative",
            left: "7px",
          }}
        >
          検索
        </div>
      </Button>

      {isSearching && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ color: "white" }}>検索中・・・</div>
          <CircularProgress sx={{ color: "white" }} />
        </div>
      )}
    </div>
  );
};

export default SearchBtn;
