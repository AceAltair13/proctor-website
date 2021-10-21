import React, { useState } from "react";
import {
    MenuItem,
    Container,
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
} from "@mui/material";
import { Link as _Link } from "react-router-dom";

const roles = [
    {
        value: "student",
        label: "Student",
    },
    {
        value: "supervisor",
        label: "Supervisor",
    },
];

export default function Register() {
    const [role, setRole] = useState(roles[0].value);
    const [error, setError] = useState([false, ""]);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        // const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const reenterPassword = data.get("reenter-password");
        const role = data.get("role");

        if (password !== reenterPassword) {
            setError([true, "Password does not match"]);
        } else {
            setError([false, ""]);
            console.log(firstName, lastName, email, password, role);
        }
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
                <Typography component="h1" variant="h5">
                    EXAMINATOR | Sign Up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
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
                        <Grid item xs={12}>
                            <TextField
                                error={error[0]}
                                required
                                fullWidth
                                name="reenter-password"
                                label="Re-Enter Password"
                                type="password"
                                id="reenter-password"
                                helperText={error[1]}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="role"
                                name="role"
                                required
                                select
                                fullWidth
                                label="Role"
                                value={role}
                                onChange={handleChange}
                            >
                                {roles.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                variant="body2"
                                component={_Link}
                                to="/login"
                                underline="hover"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}