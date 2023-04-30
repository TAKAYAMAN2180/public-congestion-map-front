import styled from "styled-components";
import {Box, IconButton} from "@mui/material";
import {Dispatch, FC, ReactNode, SetStateAction} from "react";
import CancelIcon from '@mui/icons-material/Cancel';
import Image from "next/image";

type Props = {
    children?: ReactNode;
    focusedNumSetter: Dispatch<SetStateAction<number | null>>
};


const FixedBox = styled(Box)`
  display: block;
  height: 150px;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  opacity: 0.92;
  background-color: #ffffff; // お好みの背景色に変更
`;

const StyledFixedBox = ({children, focusedNumSetter}: Props) => {
    const handleIconClicked = () => {
        focusedNumSetter(null);
    }


    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0
        }}>
            <FixedBox sx={{boxShadow: 3}} borderRadius={3}>
                <IconButton
                    size={"small"}
                    sx={{position: "absolute", top: 0, right: 0}}
                    onClick={handleIconClicked}
                >
                    <CancelIcon/>
                </IconButton>
                {children}
                <div style={{width: "100%", height: "50%", position: "absolute", bottom: 0, right: 0, left: 0}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        width: "100%",
                        height: "100%",
                        position: "relative"
                    }}>
                        <Image src={"/congestion_list.webp"} alt={"congestion_list"} fill
                               style={{
                                   objectFit: "contain",
                                   width: "100%",
                                   pointerEvents: "none",
                               }}/>
                    </div>
                </div>

            </FixedBox>
        </div>
    )
}

export default StyledFixedBox;