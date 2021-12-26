import React from "react";
import {
    Container,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Backdrop,
    CircularProgress,
    Card,
    Avatar,
} from "@mui/material";
import { Link as _Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Features/apiCalls";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BackgroundImage from "../../Assets/Images/cubes.png";

function Login() {
    const dispatch = useDispatch();
    const { isFetching } = useSelector((state) => state.user);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email");
        const password = data.get("password");
        console.log(email, password);
        const senddata = { emailId: email, password: password };
        login(dispatch, senddata);
    };

    return (
        <Box
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "primary.dark",
                backgroundImage: `url(${BackgroundImage})`,
            }}
        >
            <Container maxWidth="xs">
                <Card sx={{ p: 3, mt: 10 }} elevation={4}>
                    <Box
                        sx={{
                            paddingY: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.dark" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Logo variant="h4" />
                        <Typography variant="h6">Sign In</Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="success"
                                disabled={isFetching}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In To Examinator
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link
                                        variant="body2"
                                        component={_Link}
                                        to="/register"
                                        underline="hover"
                                    >
                                        Don't have an account? Register here
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Card>
            </Container>
            <Backdrop open={isFetching}>
                <CircularProgress color="warning" />
            </Backdrop>
        </Box>
    );
}

export default Login;
