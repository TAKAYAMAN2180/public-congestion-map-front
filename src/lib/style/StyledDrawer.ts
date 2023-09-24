import styled from "styled-components";
import {Drawer} from "@mui/material";

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 500;
  }

  .MuiBackdrop-root {
    background-color: transparent;
    z-index: 500;
  }

  > * {
    color: white;
  }


  z-index: 500;
`;

export default StyledDrawer;