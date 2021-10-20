import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
    },
});

export default theme;
