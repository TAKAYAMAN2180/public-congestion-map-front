import {Button, ThemeProvider} from "@mui/material";
import theme from "@/src/lib/style/theme";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";

type LoginPageProps = {
    onLogInBtnClicked: (storeKey: string) => Promise<any>
}

const LoginPage = ({onLogInBtnClicked}: LoginPageProps) => {
    const [textFieldValue, setTextFieldValue] = useState<string>("");

    return (
        <div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div style={{fontWeight: "Bold", padding: "1em", fontSize: "1.5rem"}}>
                    このページは模擬店出店者向けのページです。<br/>
                    下の入力欄に店舗キーを入力してください。
                </div>

                <ThemeProvider theme={theme}>
                    <div style={{width: "80%", maxWidth: "500px"}}>
                        <TextField fullWidth
                                   id="standard-search"
                                   label="店舗キー"
                                   type="search"
                                   variant="standard"
                                   onChange={(event) => setTextFieldValue(event.target.value)}
                        />
                    </div>
                    <Button variant="contained" sx={{marginTop: 3}}
                            onClick={() => onLogInBtnClicked(textFieldValue)}>ログイン</Button>
                </ThemeProvider>
            </div>
        </div>
    );
}

export default LoginPage;