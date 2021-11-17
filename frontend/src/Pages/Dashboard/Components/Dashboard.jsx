import React, { useState } from "react";
import { Box } from "@mui/material";
import DashboardNavbar from "./DashboardNavbar";
import DashboardDrawer from "./DashboardDrawer";
import DashboardContent from "./DashboardContent";

function Dashboard(props) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <DashboardNavbar handleDrawerToggle={handleDrawerToggle} />
            <DashboardDrawer
                image={props.image}
                role={props.role}
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
            />
            <DashboardContent />
        </Box>
    );
}

export default Dashboard;
