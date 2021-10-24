import React from "react";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";

function Navbar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color="inherit" elevation={0}>
                <Container disableGutters>
                    <Toolbar>
                        <Logo variant="h6" />
                        <Button
                            variant="text"
                            color="inherit"
                            component={Link}
                            to="/"
                        >
                            Home
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            sx={{ ml: 2 }}
                            component={Link}
                            to="/features"
                        >
                            Features
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            sx={{ ml: 2 }}
                            component={Link}
                            to="/features"
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="text"
                            color="inherit"
                            sx={{ ml: 2 }}
                            component={Link}
                            to="/about"
                        >
                            About
                        </Button>
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
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}

export default Navbar;
