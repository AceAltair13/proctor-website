import {
    Box,
    Breadcrumbs,
    Button,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import {
    Link as RouterLink,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshablePage from "../../CommonPages/RefreshablePage";
import CustomDataGrid from "../../../../Components/CustomDataGrid";
import { getStudentResponses } from "../../../../Api/supervisor";

const ViewResponses = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const { examName, examId } = useSelector(
        (state) => state.supervisor.selectedExam
    );
    const { studentsList } = useSelector(
        (state) => state.supervisor.studentResponses
    );
    const fetchStudentRespones = () => getStudentResponses(dispatch, examId);

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

    const _rows = studentsList
        ? studentsList.map((student, index) => ({
              id: student.studentId,
              srNo: index + 1,
              studentName: `${student.studentFirstName} ${student.studentLastName}`,
              marksScored: student.studentMarksScored,
          }))
        : [];

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
            <RefreshablePage fetchExamFunction={fetchStudentRespones}>
                <Stack spacing={2}>
                    <Typography variant="h6">
                        Student Responses ({_rows.length})
                    </Typography>
                    <CustomDataGrid columns={columns} rows={_rows} />
                    <Box sx={{ py: 5 }} />
                </Stack>
            </RefreshablePage>
        </>
    );
};

export default ViewResponses;
