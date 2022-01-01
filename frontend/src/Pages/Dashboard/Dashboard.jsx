import React, { useState } from "react";
import { Box } from "@mui/material";
import DashboardNavbar from "./Components/DashboardNavbar";
import DashboardDrawer from "./Components/DashboardDrawer";
import DashboardContent from "./Components/DashboardContent";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { drawerItems } from "./Components/drawerList";

function Dashboard() {
    const user = useSelector((state) => state.user.currentUser);
    const [title, setTitle] = useState("Dashboard");
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    if (!user) {
        return <Redirect to="/login" />;
    } else {
        let role = user.role;

        return (
            <Box sx={{ display: "flex" }}>
                <DashboardNavbar
                    handleDrawerToggle={handleDrawerToggle}
                    title={title}
                />
                <DashboardDrawer
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    drawerItems={drawerItems[role]}
                />
                <DashboardContent>
                    <Switch>
                        {drawerItems[role].map((item) =>
                            item.items.map((subItem, index) => (
                                <Route
                                    key={index}
                                    exact
                                    path={subItem.to}
                                    render={(props) => {
                                        setTitle(subItem.text);
                                        return <subItem.component {...props} />;
                                    }}
                                />
                            ))
                        )}
                    </Switch>
                </DashboardContent>
            </Box>
        );
    }
}

export default Dashboard;
