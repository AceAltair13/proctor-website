import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { LOGOUT_URL } from "../../Constants/urls";
import { Redirect } from "react-router-dom";

function Dashboard() {
    const [redirect, setRedirect] = React.useState(false);
    const logout = () => {
        axios
            .get(LOGOUT_URL)
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setRedirect(true);
                }
            })
            .catch((err) => console.log(err));
    };

    if (redirect) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}

export default Dashboard;
