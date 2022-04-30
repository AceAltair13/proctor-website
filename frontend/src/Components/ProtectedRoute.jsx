import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
    const { authenticated, children, ...rest } = props;
    const user = useSelector((state) => state.user.currentUser);
    // TODO: Implement cookie based authentication

    if (authenticated && user) {
        return <Redirect to="/dashboard" />;
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
