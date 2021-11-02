import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Logo(props) {
    return (
        <Typography
            variant={props.variant}
            sx={{ color: "primary.main", textDecoration: "none" }}
            fontWeight="fontWeightBold"
            component={Link}
            to="/"
        >
            EXAMINATOR
        </Typography>
    );
}

Logo.propTypes = {
    variant: PropTypes.string.isRequired,
};

export default Logo;
