import React from "react";
import { Button, Container, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function ExamFooter() {
    return (
        <Grid item container spacing={0}>
            <Grid item xs={10} textAlign="end" container>
                <Grid item xs textAlign="start">
                    <Container>
                        <Button
                            variant="outlined"
                            color="primary"
                            endIcon={<BookmarkIcon />}
                            size="large"
                        >
                            Mark for Review
                        </Button>
                    </Container>
                </Grid>
                <Grid item xs>
                    <Container>
                        <Button
                            size="large"
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                        >
                            Previous
                        </Button>
                        <Button
                            size="large"
                            sx={{ ml: 3 }}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Next
                        </Button>
                    </Container>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ExamFooter;
