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
} from "@mui/material";
import { drawerWidth } from "../../../Constants/sizes";
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";
import { logout } from "../../../Features/userSlice";
import { LOGOUT_URL,cookies} from "../../../Constants/urls";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

function DashboardNavbar(props) {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);

    // const logoutUser = () => {
    //     axios
    //         .post(LOGOUT_URL, {}, config)
    //         .then((res) => {
    //             console.log(res.data);
    //             if (res.status === 200) {
    //                 dispatch(logout());
    //                 setRedirect(true);
    //             }
    //         })
    //         .catch((err) => alert(err.response.data));
    // };
    const logoutUser = () => {
        console.log(cookies.get('token'))
        let config = {
            headers: {
                // 'token': cookies.get('token'),
                'token': localStorage.getItem('token'),

            }
        }
        axios
            .post(LOGOUT_URL, {}, config)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    // delete USER_EMAIL-examinatorToken from localStorage
                    localStorage.removeItem("token")
                    // cookies.remove('token', res.data.accessToken, { path: "/"+res.data.userId+"/" })
                    dispatch(logout());
                    setRedirect(true);
                }
            })
        }

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
            >
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
                        Responsive drawer
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
