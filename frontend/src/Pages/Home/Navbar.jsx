import React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import SchoolIcon from "@mui/icons-material/School";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSelector } from "react-redux";

function Navbar() {
    const user = useSelector((state) => state.user.value);

    const popupState = usePopupState({
        variant: "popover",
        popupId: "mobileNavMenu",
    });

    const navBarItems = [
        {
            name: "Home",
            link: "/",
            icon: <HomeIcon />,
        },
        {
            name: "Features",
            link: "/features",
            icon: <FeaturedPlayListIcon />,
        },
        {
            name: "Get Started",
            link: "/get-started",
            icon: <SchoolIcon />,
        },
        {
            name: "About",
            link: "/about",
            icon: <InfoIcon />,
        },
    ];

    const authNavBarItems = (
        <>
            <Button
                variant="text"
                color="inherit"
                sx={{ ml: 2 }}
                component={Link}
                to="/login"
            >
                Sign In
            </Button>
            <Button
                color="primary"
                sx={{ ml: 2 }}
                component={Link}
                to="/register"
            >
                Sign Up
            </Button>
        </>
    );

    const gotoDashboard = (
        <Button
            color="primary"
            sx={{ ml: 2 }}
            component={Link}
            to="/dashboard"
            startIcon={<DashboardIcon />}
        >
            Go to dashboard
        </Button>
    );

    const desktopMenu = (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navBarItems.map((item, index) => (
                <Button
                    variant="text"
                    color="inherit"
                    sx={{ ml: 2 }}
                    component={Link}
                    to={item.link}
                    key={index}
                >
                    {item.name}
                </Button>
            ))}
            {user ? gotoDashboard : authNavBarItems}
        </Box>
    );

    const mobileMenu = (
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
                size="large"
                onClick={() => {}}
                color="inherit"
                {...bindTrigger(popupState)}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                {...bindMenu(popupState)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={popupState.close}>Item 1</MenuItem>
                <MenuItem onClick={popupState.close}>Item 2</MenuItem>
                <MenuItem onClick={popupState.close}>Item 3</MenuItem>
            </Menu>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="inherit" elevation={0}>
                <Container disableGutters>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Logo variant="h6" />
                        </Box>
                        {desktopMenu}
                        {mobileMenu}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Navbar;
