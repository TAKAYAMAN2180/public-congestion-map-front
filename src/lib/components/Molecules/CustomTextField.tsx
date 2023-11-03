import StyledTextField from "@/src/lib/style/StyledTextField";
import {InputAdornment, ThemeProvider} from "@mui/material";
import CancelBtn from "@/src/lib/components/Atom/Button/CancelBtn";
import React, {ChangeEvent} from "react";
import {createTheme} from "@mui/material/styles";

const subTheme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    }
});

type CustomTextFieldProps = {
    textFieldValue: string;
    handleTextFieldChanged: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
    handleCancelBtnClicked: () => void;
}

const CustomTextField = ({textFieldValue, handleTextFieldChanged, handleCancelBtnClicked}: CustomTextFieldProps) => {
    return (
        <ThemeProvider theme={subTheme}>
            <StyledTextField
                id="input-with-icon-textfield"
                label="キーワードを入力..."
                onChange={handleTextFieldChanged}
                variant="filled"
                value={textFieldValue}

                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {textFieldValue.length > 0 && <CancelBtn onClick={handleCancelBtnClicked}/>}
                        </InputAdornment>
                    ),
                }}
            />
        </ThemeProvider>
    );
}

export default CustomTextField;