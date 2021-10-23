import { createTheme } from '@mui/material/styles';
import { green, orange, purple } from '@mui/material/colors';

const theme = createTheme({
    palette:{
        primary: purple,
        secondary: green,
    },
    status: {
        danger: orange[500],
    },
});

export default theme;

