import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const CustomCard = ({ title, icon, children }) => {
    return (
        <Card>
            <CardHeader
                avatar={icon}
                title={<Typography variant="h5">{title}</Typography>}
                sx={{
                    color: "white",
                    bgcolor: "primary.main",
                }}
                disableTypography
            />
            <CardContent sx={{ p: 4 }}>{children}</CardContent>
        </Card>
    );
};

export default CustomCard;
