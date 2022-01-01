import React, { useState } from "react";
import {
    MenuItem,
    Container,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Avatar,
} from "@mui/material";
import { Link as _Link, Redirect } from "react-router-dom";
import Logo from "../../Components/Logo";
import axios from "axios";
import {
    STUDENT_REGISTER_URL,
    SUPERVISOR_REGISTER_URL,
} from "../../Constants/urls";
import { useSelector } from "react-redux";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
    const [redirect, setRedirect] = useState(false);

    const user = useSelector((state) => state.user.currentUser);

    if (user) {
        return <Redirect to="/dashboard" />;
    }

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get("firstName");
        const lastName = data.get("lastName");
        const email = data.get("email");
        const password = data.get("password");
        const reenterPassword = data.get("reenter-password");
        const phone = data.get("phone");
        const role = data.get("role");

        if (password !== reenterPassword) {
            setError([true, "Password does not match"]);
        } else {
            setError([false, ""]);
            console.log(firstName, lastName, email, password, phone, role);
        }
        if (role === "student") {
            console.log("student");
            const senddata = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                emailId: email,
                password: password,
            };

            axios({
                method: "post",
                url: STUDENT_REGISTER_URL,
                data: senddata,
            })
                .then(function (response) {
                    console.log(response.data);
                    setRedirect(true);
                })
                .catch(function (error) {
                    alert(error.response.data);
                });
        } else {
            const senddata = {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phone,
                emailId: email,
                password: password,
            };
            axios({
                method: "post",
                url: SUPERVISOR_REGISTER_URL,
                data: senddata,
            })
                .then(function (response) {
                    console.log(response.data);
                    setRedirect(true);
                })
                .catch(function (error) {
                    alert(error.response.data);
                });
        }
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <Container component="main" maxWidth="xs">
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
                <Typography variant="h6">Sign Up</Typography>
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
                                required
                                fullWidth
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                id="phone"
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
