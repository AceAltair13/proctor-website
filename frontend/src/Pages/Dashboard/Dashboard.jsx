import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { LOGOUT_URL } from "../../Constants/urls";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Features/userSlice";

function Dashboard() {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = React.useState(false);
    const user = useSelector((state) => state.user.value);

    if (!user) {
        return <Redirect to="/login" />;
    }

    const logoutUser = () => {
        axios
            .post(LOGOUT_URL)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    dispatch(logout());
                    setRedirect(true);
                }
            })
            .catch((err) => console.log(err.response.data));
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Button onClick={logoutUser}>Logout</Button>
        </div>
    );
}

export default Dashboard;
