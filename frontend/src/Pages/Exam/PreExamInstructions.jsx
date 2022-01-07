import React, { useState } from "react";
import {
    AppBar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useSelector } from "react-redux";
import { useRouteMatch, Link } from "react-router-dom";

const PreExamInstructions = () => {
    const { exam } = useSelector((state) => state.exam);
    const [iAgree, setIAgree] = useState(false);
    const { url } = useRouteMatch();

    const handleIAgree = () => {
        setIAgree(!iAgree);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" color="inherit" mx="auto">
                        {exam.examName}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Stack p={4}>
                <Toolbar />
                <Typography
                    variant="h6"
                    fontWeight="fontWeightBold"
                    gutterBottom
                >
                    Instructions from the supervisor:
                </Typography>
                <Typography variant="body2" color="error" mt={-1}>
                    Please read all the instructions carefully
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    mt={2}
                    sx={{
                        maxHeight: "50vh",
                        overflow: "auto",
                    }}
                >
                    {exam.examInstructions}
                </Typography>
            </Stack>
            <Box
                sx={{
                    mt: "auto",
                    position: "static",
                }}
            >
                <Divider />
                <Stack px={4} pb={2}>
                    <Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={iAgree}
                                    onChange={handleIAgree}
                                />
                            }
                            label="I have read the instructions"
                            sx={{ mt: 2 }}
                        />
                    </Box>
                    <Button
                        disabled={!iAgree}
                        size="large"
                        sx={{ ml: "auto" }}
                        color="success"
                        endIcon={<NavigateNextIcon />}
                        component={Link}
                        to={`${url}/face-capture`}
                    >
                        Proceed
                    </Button>
                </Stack>
                <AppBar position="sticky" elevation={0}>
                    <Toolbar variant="dense">
                        <Typography
                            variant="h6"
                            fontWeight="fontWeightBold"
                            mx="auto"
                        >
                            EXAMINATOR
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </Box>
    );
};

export default PreExamInstructions;
