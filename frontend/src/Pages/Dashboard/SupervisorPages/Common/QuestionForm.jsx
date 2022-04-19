import {
    Box,
    Button,
    Checkbox,
    Divider,
    Fab,
    FormControlLabel,
    Grid,
    Stack,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormContainer from "../../../../Components/FormContainer";
import theme from "../../../../Themes/rte_theme";
import MuiEditor from "mui-rte";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const QuestionForm = ({ edit }) => {
    const { selectedQuestionId, selectedQuestionPaper } = useSelector(
        (state) => state.supervisor
    );
    const question = selectedQuestionPaper.find(
        (q) => q.questionId === selectedQuestionId
    );
    const optionRows = question.options.map((option, index) => ({
        id: option.optionId,
        srNo: index + 1,
        optionText: option.optionDesc,
        isCorrect: option.isCorrect,
    }));

    const [marks, setMarks] = useState(edit ? question.weightage : 0);
    const [rows, setRows] = useState(edit ? optionRows : []);
    const [selectionModel, setSelectionModel] = useState([]);

    const handleDelete = () => {
        const selectedRows = new Set(selectionModel);
        setRows((r) => r.filter((x) => !selectedRows.has(x.id)));
    };

    const column = [
        {
            field: "srNo",
            headerName: "Sr No",
            width: 100,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "optionText",
            headerName: "Option",
            minWidth: 200,
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "isCorrect",
            headerName: "Correct",
            width: 100,
            headerAlign: "center",
            align: "center",
            type: "boolean",
        },
    ];

    const handleMarksChange = (event) => {
        let marks = event.target.value;
        if (marks < 0) {
            marks = 0;
        }
        setMarks(marks);
    };

    const muiRteProps = {
        label: "Start typing here...",
    };

    if (edit) {
        muiRteProps.defaultValue = JSON.parse(question.question);
    }

    return (
        <Box component="form" noValidate>
            <Grid container spacing={2}>
                <Grid item md={8} xs={12} container spacing={2}>
                    <Grid item xs={12}>
                        <FormContainer title="Question">
                            <Grid item xs={12}>
                                <ThemeProvider theme={theme}>
                                    <MuiEditor {...muiRteProps} />
                                </ThemeProvider>
                            </Grid>
                        </FormContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <FormContainer title="Add an option">
                            <Grid item xs={12}>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        variant="outlined"
                                        label="Enter option text"
                                        fullWidth
                                    />
                                    <Box>
                                        <Fab color="primary">
                                            <AddIcon />
                                        </Fab>
                                    </Box>
                                </Stack>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="This is the correct option"
                                    sx={{ pl: 1 }}
                                />
                                <Divider sx={{ my: 3 }} variant="middle" />
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <Typography
                                        variant="body1"
                                        fontWeight="fontWeightBold"
                                        color="text.secondary"
                                    >
                                        Options
                                    </Typography>
                                    <Button
                                        color="error"
                                        size="small"
                                        sx={{ my: 2 }}
                                        disabled={selectionModel.length === 0}
                                        onClick={handleDelete}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Delete selected
                                    </Button>
                                </Box>
                                <DataGrid
                                    columns={column}
                                    rows={rows}
                                    autoHeight
                                    checkboxSelection
                                    disableSelectionOnClick
                                    onSelectionModelChange={setSelectionModel}
                                />
                            </Grid>
                        </FormContainer>
                    </Grid>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Stack spacing={2}>
                        <FormContainer title="Marks">
                            <Grid item xs={12}>
                                <TextField
                                    label="Enter Marks"
                                    type="number"
                                    fullWidth
                                    helperText="Marks alloted for this question"
                                    value={marks}
                                    onChange={handleMarksChange}
                                />
                            </Grid>
                        </FormContainer>
                        <Button size="large" color="success">
                            Add Question
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default QuestionForm;
