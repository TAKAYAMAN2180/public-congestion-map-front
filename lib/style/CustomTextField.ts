import React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import {styled} from '@mui/system';


const CustomTextField = styled(TextField)`
  background-color: rgba(256,256,256,0.7);
  
  
  
  & .MuiInputBase-root {
    color: #ffffff; // 例: #ff9800;
  }

  & .MuiInputLabel-root {
    color: black; // 例: #ff9800;
    margin-left: 9rem;
  }

  & .MuiInput-underline:before {
    border-bottom-color: #ffffff; // 例: #ff9800;
  }
`;

export default CustomTextField;