import TextField from '@mui/material/TextField';
import {styled} from '@mui/system';


const CustomTextField = styled(TextField)`
  background-color: rgba(256,256,256,0.9);
     
  & .MuiInputBase-root {
    color: #000000; // 例: #ff9800;
  }

  & .MuiInputLabel-root {
    color: black; // 例: #ff9800;
    margin-left: 8.5rem;
  }

  & .MuiInput-underline:before {
    border-bottom-color: #000000; // 例: #ff9800;
  }
`;

export default CustomTextField;