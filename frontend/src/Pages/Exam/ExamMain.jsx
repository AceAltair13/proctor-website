import {
    Card,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ExamNavigation from "./ExamNavigation";

function ExamMain() {
    return (
        <Grid container sx={{ pt: 2 }}>
            <Grid item xs={5}>
                <Container>
                    <Stack>
                        <Typography
                            variant="body1"
                            fontWeight="fontWeightBold"
                            gutterBottom
                        >
                            Question 1 of 20
                        </Typography>
                        <Box sx={{ maxHeight: "70vh", overflow: "auto", pr: 1, pb: 1 }}>
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum ?
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum ?
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum ?
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum ?
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum ?
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum ?
                        </Typography>
                        </Box>
                    </Stack>
                </Container>
            </Grid>
            <Grid item xs={5}>
                <Card sx={{p: 3, mr: 10}} variant="outlined">
                    <Stack>
                        <Typography
                            variant="body1"
                            fontWeight="fontWeightBold"
                            gutterBottom
                        >
                            Options
                        </Typography>
                        <FormControl component="fieldset">
                            <RadioGroup name="options" sx={{maxHeight: "70vh", overflow: "auto"}}>
                                <FormControlLabel
                                    value="option1"
                                    control={<Radio />}
                                    label="Option 1"
                                />
                                <FormControlLabel
                                    value="option2"
                                    control={<Radio />}
                                    label="Option 2"
                                />
                                <FormControlLabel
                                    value="option3"
                                    control={<Radio />}
                                    label="Option 3"
                                />
                                <FormControlLabel
                                    value="option4"
                                    control={<Radio />}
                                    label="Option 4"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Stack>
                </Card>
            </Grid>
            <Grid item xs={2}>
                <ExamNavigation />
            </Grid>
        </Grid>
    );
}

export default ExamMain;
