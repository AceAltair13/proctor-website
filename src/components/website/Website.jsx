import React from "react";
import { Link } from "react-router-dom";

function Website() {
    return (
        <>
            <h1>Website</h1>
            <Link to="/admin">Go To Admin</Link>
            <br />
            <Link to="/exam">Go To Exam</Link>
        </>
    );
}

export default Website;
