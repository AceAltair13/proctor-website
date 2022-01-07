import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Toolbar,
    Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { snackActions } from "../../Utils/SnackBarUtils";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReplayIcon from "@mui/icons-material/Replay";

const PreExamFaceCapture = () => {
    const { exam } = useSelector((state) => state.exam);
    const webcamRef = useRef(null);
    const [image, setImage] = useState("");

    const videoConstraints = {
        height: 300,
        width: 350,
        facingMode: "user",
    };

    const captureImage = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h5" color="inherit" mx="auto">
                        {exam.examName}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ p: 2 }} maxWidth="md">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            fontWeight="fontWeightBold"
                            textAlign="center"
                            gutterBottom
                        >
                            Face Capture & Registration
                        </Typography>
                    </Grid>
                    <Grid item container justifyContent="center" spacing={2}>
                        <Grid item xs={5}></Grid>
                        <Grid item xs={2} container justifyContent="center">
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={5} container justifyContent="center">
                            {image === "" ? (
                                <Webcam
                                    audio={false}
                                    videoConstraints={videoConstraints}
                                    screenshotFormat="image/jpeg"
                                    ref={webcamRef}
                                    onUserMediaError={(e) =>
                                        snackActions.warning(e)
                                    }
                                />
                            ) : (
                                <img src={image} alt="face" />
                            )}
                            {image === "" ? (
                                <Button
                                    size="large"
                                    fullWidth
                                    startIcon={<CameraAltIcon />}
                                    sx={{ mt: 2 }}
                                    onClick={captureImage}
                                >
                                    Capture
                                </Button>
                            ) : (
                                <Button
                                    size="large"
                                    fullWidth
                                    startIcon={<ReplayIcon />}
                                    sx={{ mt: 2 }}
                                    onClick={() => setImage("")}
                                >
                                    Reset
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Box
                sx={{
                    mt: "auto",
                    position: "static",
                }}
            >
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

export default PreExamFaceCapture;
