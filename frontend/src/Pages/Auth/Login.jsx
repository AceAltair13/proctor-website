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
} from "@mui/material";
import { Link as _Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { login } from "../../Features/apiCalls";

function Login() {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { isFetching, error, errorMsg } = useSelector((state) => state.user);

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
            <Backdrop open={isFetching}>
                <CircularProgress color="warning" />
            </Backdrop>
        </Container>
    );
}

export default Login;
