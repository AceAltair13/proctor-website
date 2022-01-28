import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormContainer = (props) => {
    return (
        <Card>
            <CardHeader title={props.title} />
            <CardContent>
                <Grid container spacing={2}>
                    {props.children}
                </Grid>
            </CardContent>
        </Card>
    );
};

const TextInput = (props) => {
    return (
        <Grid item xs={12}>
            <TextField fullWidth {...props} />
        </Grid>
    );
};

const CreateExam = () => {
    const [convertedText, setConvertedText] = useState("");

    return (
        <Grid container spacing={3}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <FormContainer title="Exam Details">
                    <TextInput label="Exam Name" />
                    <TextInput label="Exam Description" multiline />
                </FormContainer>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
                <FormContainer title="Exam Timings">
                    <TextInput label="Exam Date" />
                    <TextInput label="Exam Time" />
                </FormContainer>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
                <FormContainer title="Exam Instructions">
                    <Grid item xs={12}>
                        <ReactQuill
                            theme="snow"
                            value={convertedText}
                            onChange={setConvertedText}
                            placeholder="Start typing here..."
                            modules={CreateExam.modules}
                            formats={CreateExam.formats}
                        />
                    </Grid>
                </FormContainer>
            </Grid>
        </Grid>
    );
};

CreateExam.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};

CreateExam.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

export default CreateExam;
