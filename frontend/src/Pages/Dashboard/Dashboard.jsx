import React from "react";
import { Box } from "@mui/material";
import DashboardNavbar from "./Components/DashboardNavbar";
import DashboardDrawer from "./Components/DashboardDrawer";
import DashboardContent from "./Components/DashboardContent";
import { Route, Switch } from "react-router-dom";
import { drawerItems } from "./Components/drawerList";
import { useSelector } from "react-redux";

function Dashboard() {
    const role = useSelector((state) => state.user.currentUser.role);

    return (
        <Box sx={{ display: "flex" }}>
            <DashboardNavbar />
            <DashboardDrawer drawerItems={drawerItems[role]} />
            <Switch>
                {drawerItems[role].map((item) =>
                    item.items.map((subItem, index) => (
                        <Route key={index} path={subItem.to}>
                            <DashboardContent title={subItem.text}>
                                <subItem.component />
                            </DashboardContent>
                        </Route>
                    ))
                )}
            </Switch>
        </Box>
    );
}

export default Dashboard;
