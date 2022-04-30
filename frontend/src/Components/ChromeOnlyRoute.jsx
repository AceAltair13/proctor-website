import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import MobileExamError from "../Pages/Errors/MobileExamError";
import { isMobile, isChrome } from "react-device-detect";

const ChromeOnlyRoute = (props) => {
    const { children, ...rest } = props;

    if (isMobile || !isChrome) {
        return <MobileExamError />;
    }

    return <ProtectedRoute {...rest}>{children}</ProtectedRoute>;
};

export default ChromeOnlyRoute;
