import { List } from "@mui/material";
import StyledDrawer from "@/src/lib/style/StyledDrawer";
import React from "react";
import SideDrawerBtn from "@/src/lib/components/Atom/Button/SideDrawerBtn";
import StoreIcon from "@mui/icons-material/Store";
import TwitterIcon from "@mui/icons-material/Twitter";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import FestivalIcon from "@mui/icons-material/Festival";

type Props = {
  isListOpen: boolean;
  handleCloseIconClicked: (event: any) => void;
};

const MenuDrawer = ({ isListOpen, handleCloseIconClicked }: Props) => {
  return (
    <>
      <StyledDrawer
        anchor="left"
        open={isListOpen}
        onClose={handleCloseIconClicked}
      >
        <div style={{ height: 70 }} />
        <List>
          {/*<SideDrawerBtn text={'各種リンク'} key={'Links'} SvgIcon={LinkIcon}/>*/}
          {/*<SideDrawerBtn text={'困ったときは？'} key={'Info'} SvgIcon={HelpOutlineIcon}/>*/}
          {/*<SideDrawerBtn text={'このサイトについて'} key={'Explain'} SvgIcon={LightbulbIcon}/>*/}
          <SideDrawerBtn
            text={"BKC祭典公式サイト"}
            key={"Bkc-Official-site"}
            SvgIcon={FestivalIcon}
            page={"http://festival.ritsumei.club/rits-brothers/bkc/"}
          />
          <SideDrawerBtn
            text={"立命館大学学園祭公式サイト"}
            key={"Official-site"}
            SvgIcon={WebAssetIcon}
            page={"http://festival.ritsumei.club/rits-brothers/"}
          />
          <SideDrawerBtn
            text={"BKC祭典公式Twitter"}
            key={"Official-Twitter"}
            SvgIcon={TwitterIcon}
            page={"https://x.com/rits_fes_koho"}
          />
        </List>
      </StyledDrawer>
    </>
  );
};

export default MenuDrawer;
