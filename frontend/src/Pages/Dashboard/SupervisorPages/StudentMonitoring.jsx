import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import ComingSoon from "../../../Assets/Images/coming_soon.svg";

const StudentMonitoring = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Container maxWidth="sm">
                <Stack textAlign="center">
                    <img
                        src={ComingSoon}
                        alt="Coming Soon"
                        style={{
                            width: "100%",
                            height: "auto",
                        }}
                    />
                    <Typography variant="h4" fontWeight="fontWeightBold" mt={3}>
                        Coming Soon
                    </Typography>
                    <Typography variant="h6" maxWidth="sm">
                        This feature is currently under development.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};

export default StudentMonitoring;
