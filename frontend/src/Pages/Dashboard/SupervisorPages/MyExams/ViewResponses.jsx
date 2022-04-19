import {
    Box,
    Breadcrumbs,
    Button,
    Divider,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import {
    Link as RouterLink,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import RefreshablePage from "../../CommonPages/RefreshablePage";
import CustomDataGrid from "../../../../Components/CustomDataGrid";

const ViewResponses = () => {
    const history = useHistory();
    const { url } = useRouteMatch();
    const { examName, examId, examDesc } = useSelector(
        (state) => state.supervisor.selectedExam
    );
    const columns = [
        {
            headerName: "Sr No",
            field: "srNo",
            width: 100,
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Student Name",
            field: "studentName",
            minWidth: 250,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Marks Scored",
            field: "marksScored",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Action",
            field: "action",
            width: 200,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => history.push(`${url}/${params.row.id}`)}
                        size="small"
                    >
                        View Details
                    </Button>
                );
            },
        },
    ];

    const rows = [
        {
            id: 1,
            srNo: 1,
            studentName: "Student 1",
            marksScored: "10",
        },
        {
            id: 2,
            srNo: 2,
            studentName: "Student 2",
            marksScored: "7",
        },
        {
            id: 3,
            srNo: 3,
            studentName: "Student 3",
            marksScored: "6",
        },
    ];

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
                <Typography>View Responses</Typography>
            </Breadcrumbs>
            <RefreshablePage fetchExamFunction={() => {}}>
                <Stack spacing={2}>
                    <Typography variant="h6">Examination Details</Typography>
                    <Divider />
                    <Paper
                        elevation={4}
                        sx={{ borderLeft: "8px solid #1976d2" }}
                    >
                        <Stack sx={{ p: 3 }}>
                            <Typography variant="h6">
                                <strong>Exam Id:</strong> {examId}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Exam Name: </strong>
                                {examName}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Exam Description:</strong> {examDesc}
                            </Typography>
                            <Typography variant="h6">
                                <strong>Maximum Marks:</strong> 100
                            </Typography>
                        </Stack>
                    </Paper>
                    <Typography variant="h6">Student Responses</Typography>
                    <Divider />
                    <CustomDataGrid columns={columns} rows={rows} />
                    <Box sx={{ py: 5 }} />
                </Stack>
            </RefreshablePage>
        </>
    );
};

export default ViewResponses;
