import {
    Box,
    Breadcrumbs,
    Button,
    Dialog,
    DialogContent,
    Divider,
    Link,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshablePage from "../../CommonPages/RefreshablePage";
import AddIcon from "@mui/icons-material/Add";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PublishIcon from "@mui/icons-material/Publish";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { getQuestionPaperForSupervisor } from "../../../../Api/supervisor";
import {
    setSelectedQuestionId,
    setSupervisorDialogOpen,
} from "../../../../Features/supervisorSlice";
import CustomDataGrid from "../../../../Components/CustomDataGrid";

const QuestionDialog = () => {
    const dispatch = useDispatch();
    const { selectedQuestionId, supervisorDialogOpen, selectedQuestionPaper } =
        useSelector((state) => state.supervisor);
    const optionsColumnSchema = useMemo(
        () => [
            {
                headerName: "ID",
                field: "op_id",
                width: 100,
                headerAlign: "center",
                align: "center",
            },
            {
                headerName: "Option",
                field: "option",
                minWidth: 200,
                headerAlign: "center",
                align: "center",
                flex: 1,
            },
            {
                headerName: "Correct",
                field: "isCorrect",
                width: 100,
                headerAlign: "center",
                align: "center",
                type: "boolean",
            },
        ],
        []
    );
    const optionRows = useMemo(
        () =>
            selectedQuestionPaper[selectedQuestionId]?.options?.map(
                (option, index) => ({
                    id: index,
                    op_id: option.optionId,
                    option: option.optionDesc,
                    isCorrect: option.isCorrect,
                })
            ),
        [selectedQuestionPaper, selectedQuestionId]
    );

    return (
        <Dialog
            open={supervisorDialogOpen}
            onClose={() => dispatch(setSupervisorDialogOpen(false))}
            fullWidth
            maxWidth="md"
        >
            {selectedQuestionPaper.length > 0 && (
                <>
                    <DialogContent>
                        <Typography variant="body1">
                            <strong>Question: </strong>
                            {selectedQuestionPaper[selectedQuestionId].question}
                        </Typography>
                        <Typography variant="body2" textAlign="end">
                            Marks Assigned:{" "}
                            <strong>
                                {
                                    selectedQuestionPaper[selectedQuestionId]
                                        .weightage
                                }
                            </strong>
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Stack>
                            <Typography variant="body1" mb={1}>
                                <strong>Options Provided: </strong>
                            </Typography>
                            <CustomDataGrid
                                columns={optionsColumnSchema}
                                rows={optionRows}
                            />
                        </Stack>
                    </DialogContent>
                </>
            )}
        </Dialog>
    );
};

const ManageQuestionPaper = () => {
    const { selectedQuestionPaper, selectedExam, unsavedChanges } = useSelector(
        (state) => state.supervisor
    );
    const { examName } = selectedExam;
    const { examId } = useParams();
    const dispatch = useDispatch();
    const getQuestionPaper = () =>
        getQuestionPaperForSupervisor(dispatch, examId);
    const viewQuestion = useCallback(
        (id) => () => {
            dispatch(setSelectedQuestionId(id));
            dispatch(setSupervisorDialogOpen(true));
        },
        [dispatch]
    );

    const columns = useMemo(
        () => [
            {
                headerName: "Sr No",
                field: "srNo",
                width: 100,
                headerAlign: "center",
                align: "center",
            },
            {
                headerName: "Question",
                field: "question",
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                    return (
                        <Tooltip title={params.value}>
                            <Typography variant="body2" noWrap>
                                {params.value}
                            </Typography>
                        </Tooltip>
                    );
                },
                minWidth: 400,
                flex: 1,
            },
            {
                headerName: "Total Options",
                field: "totalOptions",
                headerAlign: "center",
                align: "center",
                width: 150,
            },
            {
                headerName: "Weightage",
                field: "weightage",
                width: 150,
                headerAlign: "center",
                align: "center",
            },
            {
                headerName: "Action",
                field: "action",
                type: "actions",
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon color="error" />}
                        label="Delete"
                        onClick={() => console.log(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<DriveFileRenameOutlineIcon color="success" />}
                        label="Edit"
                        onClick={() => console.log(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<VisibilityIcon color="info" />}
                        label="View"
                        onClick={viewQuestion(params.id)}
                    />,
                ],
                width: 150,
                headerAlign: "center",
                sortable: false,
                filterable: false,
            },
        ],
        [viewQuestion]
    );
    const rows = selectedQuestionPaper.map((question, index) => ({
        id: question.questionId,
        srNo: index + 1,
        question: question.question,
        totalOptions: question.options.length,
        weightage: question.weightage,
    }));

    return (
        <>
            <Breadcrumbs sx={{ mb: 3 }} separator=">">
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to="/dashboard/exam/my-exams"
                >
                    My Exams
                </Link>
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to={`/dashboard/exam/my-exams/${examId}`}
                >
                    {examName}
                </Link>
                <Typography>Manage Question Bank</Typography>
            </Breadcrumbs>
            <RefreshablePage fetchExamFunction={getQuestionPaper}>
                <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button color="success" startIcon={<AddIcon />}>
                            Add Question
                        </Button>
                        <Button
                            startIcon={<PublishIcon />}
                            disabled={!unsavedChanges}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </Box>
                <CustomDataGrid rows={rows} columns={columns} />
            </RefreshablePage>
            <QuestionDialog />
        </>
    );
};

export default ManageQuestionPaper;
