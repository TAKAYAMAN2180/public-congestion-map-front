import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Grow } from "@mui/material";
import CancelBtn from "@/src/lib/components/Atom/Button/CancelBtn";
import { useRecoilState } from "recoil";
import {
  atomPaneState,
  AtomPaneStateType,
  PaneKindStateEnum,
} from "@/src/lib/recoilAtom";
import StorePane from "@/src/lib/components/Organisms/Pane/StorePane";
import SpecialMarkPane from "@/src/lib/components/Organisms/Pane/SpecialMarkPane";
import StorePaneType from "@/src/lib/type/StorePaneType";
import SpecialMarkPaneType from "@/src/lib/type/SpecialMarkPaneType";

// paneの幅の割合(%)
const DEFAULT_WIDTH_RATIO = 95;
const DEFAULT_FONT_SIZE = 24;

const FixedBox = styled(Box)`
  display: block;
  height: auto;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px auto;
  padding: 5px;
  opacity: 0.92;
  background-color: #ffffff; // お好みの背景色に変更
  width: ${DEFAULT_WIDTH_RATIO}%;
  max-width: 550px;
`;

const RootPane = () => {
  const [paneState, setPaneState] = useRecoilState(atomPaneState);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (paneState.paneKindState == PaneKindStateEnum.CLOSE) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [paneState]);

  const handleClosed = () => {
    const temp: AtomPaneStateType = {
      paneKindState: PaneKindStateEnum.CLOSE,
      identifier: 0,
      info: null,
    };
    setPaneState(temp);
  };

  return (
    <>
      {paneState.info != null && (
        <Grow in={visible}>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 400,
            }}
          >
            <FixedBox sx={{ boxShadow: 3 }} borderRadius={3}>
              <CancelBtn
                onClick={() => {
                  handleClosed();
                }}
              />
              {paneState.paneKindState == PaneKindStateEnum.STORE_PANE ? (
                <StorePane storePaneData={paneState.info as StorePaneType} />
              ) : (
                <SpecialMarkPane
                  specialMarkPaneData={paneState.info as SpecialMarkPaneType}
                />
              )}
            </FixedBox>
          </div>
        </Grow>
      )}
    </>
  );
};

export default RootPane;
