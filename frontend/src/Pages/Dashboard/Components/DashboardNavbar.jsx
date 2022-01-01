import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Stack,
    Avatar,
    Divider,
} from "@mui/material";
import { drawerWidth } from "../../../Constants/sizes";
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";
import { logout } from "../../../Features/userSlice";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

function DashboardNavbar(props) {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const user = useSelector((state) => state.user.currentUser);

    const logoutUser = () => {
        dispatch(logout());
        setRedirect(true);
    };

    const popupState = usePopupState({
        variant: "popover",
        popupId: "accountNavMenu",
    });

    const userMenu = (
        <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                sx: {
                    width: 200,
                },
            }}
        >
            <Stack sx={{ px: 2, py: 1 }} alignItems="center">
                <Avatar sx={{ bgcolor: "secondary.light", mb: 1 }}>
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                </Avatar>
                <Typography
                    variant="body1"
                    fontWeight="fontWeightBold"
                    textAlign="center"
                >
                    {user.firstName}
                </Typography>
                <Typography variant="body2" textAlign="center">
                    {user.emailId}
                </Typography>
            </Stack>
            <Divider variant="middle" sx={{ my: 1 }} />
            <MenuItem onClick={popupState.close}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={logoutUser}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </MenuItem>
        </Menu>
    );

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    {props.title}
                </Typography>
                <IconButton color="inherit" {...bindTrigger(popupState)}>
                    <AccountCircle />
                </IconButton>
                {userMenu}
            </Toolbar>
        </AppBar>
    );
}

export default DashboardNavbar;
