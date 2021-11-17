import React from "react";
import MobileErrorImage from "../../Assets/Images/mobile_denied.svg";
import ErrorTemplate from "./ErrorTemplate";

function MobileExamError() {
    return (
        <ErrorTemplate image={MobileErrorImage} title={"Access Denied"}>
            This page is <strong>unavailable</strong> on mobile phones and
            non-Chrome browsers. Please use a{" "}
            <strong>Chrome Browser on a desktop</strong> instead.
        </ErrorTemplate>
    );
}

export default MobileExamError;
