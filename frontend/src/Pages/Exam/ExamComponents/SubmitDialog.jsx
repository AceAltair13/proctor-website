import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSubmitDialogOpen } from "../../../Features/questionPaperSlice";

const SubmitDialog = () => {
    const dispatch = useDispatch();
    const { submitDialogOpen } = useSelector((state) => state.questionPaper);
    const handleClose = () => dispatch(setSubmitDialogOpen(false));

    return (
        <Dialog
            open={submitDialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Finish Test</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to finish this test? Your answers will be submitted.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="text">
                    No
                </Button>
                <Button onClick={handleClose} variant="text" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SubmitDialog;
