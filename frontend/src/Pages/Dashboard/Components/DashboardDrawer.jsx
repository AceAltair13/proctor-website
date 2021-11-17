import React from "react";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import Logo from "../../../Components/Logo";
import MailIcon from "@mui/icons-material/Mail";
import { drawerWidth } from "../../../Constants/sizes";

function DashboardDrawer(props) {
    const drawer = (
        <div>
            <Box mx={2} mt={2} mb={4} textAlign="center">
                <img
                    src={props.image}
                    alt="Supervisor"
                    style={{ height: "auto", width: "100%" }}
                />
                <Logo variant="h5" />
                <Typography variant="h6" color="textSecondary" mt={-1}>
                    {props.role}
                </Typography>
            </Box>
            <Divider variant="middle" />
            <List>
                {[
                    "Create Exam",
                    "Add Questions",
                    "Update Questions",
                    "Delete Questions",
                    "Student Monitoring",
                    "Results",
                    "Edit Profile",
                ].map((text, index) => (
                    <ListItem button key={text} sx={{ pl: 4 }}>
                        <ListItemIcon sx={{ minWidth: "40px" }}>
                            {index % 2 === 0 ? <MailIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant="temporary"
                open={props.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default DashboardDrawer;
