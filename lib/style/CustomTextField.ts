import TextField from '@mui/material/TextField';
import {styled} from '@mui/system';

const CustomTextField = styled(TextField)`
  background-color: rgba(256, 256, 256, 0.9);
  width: 250px;

  & .MuiInputBase-root {
    color: #000000; // 例: #ff9800;
  }

  & .MuiInputLabel-root {
    color: black; // 例: #ff9800;
  }

  & .MuiInput-underline:before {
    border-bottom-color: #000000; // 例: #ff9800;
  }

  & .MuiInputAdornment-root {
    position: relative;
    top: -15px;
    left: 25px
  }

,
`;

export default CustomTextField;