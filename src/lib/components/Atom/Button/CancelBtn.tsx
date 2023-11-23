import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: (event: any) => void;
};

const CancelBtn = ({ onClick }: Props) => {
  return (
    <IconButton
      size={"small"}
      sx={{ position: "absolute", top: 5, right: 5, opacity: 0.7 }}
      onClick={(event) => {
        onClick(event);
      }}
    >
      <CancelIcon />
    </IconButton>
  );
};

export default CancelBtn;
