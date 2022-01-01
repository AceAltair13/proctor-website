import React from "react";
import { drawerWidth } from "../../../Constants/sizes";
import { Toolbar, Box } from "@mui/material";

function DashboardContent(props) {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                bgcolor: "#f5f5f5",
                height: "100vh",
            }}
        >
            <Toolbar />
            {props.children}
        </Box>
    );
}

export default DashboardContent;
