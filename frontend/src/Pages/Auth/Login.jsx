import React, { useState } from "react";
import {
    Container,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    InputAdornment,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link as _Link, Redirect } from "react-router-dom";
import Logo from "../../Components/Logo";
import axios from "axios";
import { LOGIN_URL } from "../../Constants/urls";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Features/userSlice";

function Login() {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const user = useSelector((state) => state.user.value);

    if (user) {
        return <Redirect to="/dashboard" />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get("email");
        const password = data.get("password");

        console.log(email, password);
        const senddata = { emailId: email, password: password };

        axios
            .post(LOGIN_URL, senddata)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    dispatch(login(res.data));
                    setRedirect(true);
                }
            })
            .catch((err) => console.log(err.response.data));
    };

    if (redirect) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    paddingY: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
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
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                        startIcon={<GoogleIcon />}
                        color="error"
                    >
                        Sign In With Google
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 1, mb: 2 }}
                        startIcon={<LoginIcon />}
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
        </Container>
    );
}

export default Login;
