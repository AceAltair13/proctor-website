import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab, Paper, Typography } from "@mui/material";
import { fetchStudentExams } from "../../../Features/apiCalls";
import RefreshIcon from "@mui/icons-material/Refresh";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";

const UpcomingExams = () => {
    const dispatch = useDispatch();
    const exams = useSelector((state) => state.student.exams.upcoming);
    const { isFetching } = useSelector((state) => state.student);
    const columns = [
        {
            headerName: "Sr No",
            field: "srNo",
            type: "number",
            headerAlign: "center",
            align: "center",
            width: 100,
        },
        {
            headerName: "Exam Name",
            field: "examName",
            headerAlign: "center",
            align: "center",
            width: 300,
        },
        {
            headerName: "Start Date",
            field: "startTime",
            type: "dateTime",
            headerAlign: "center",
            align: "center",
            width: 200,
        },
        {
            headerName: "End Date",
            field: "endTime",
            type: "dateTime",
            headerAlign: "center",
            align: "center",
            width: 200,
        },
        {
            headerName: "Exam Description",
            field: "examDesc",
            headerAlign: "center",
            align: "center",
            minWidth: 300,
            flex: 1,
        },
    ];
    const rows = exams.map((exam, index) => ({
        id: exam.examId,
        srNo: index + 1,
        examName: exam.examName,
        startTime: DateTime.fromISO(exam.examStartTime).toLocaleString(
            DateTime.DATETIME_MED
        ),
        endTime: DateTime.fromISO(exam.examEndTime).toLocaleString(
            DateTime.DATETIME_MED
        ),
        examDesc: exam.examDesc,
    }));

    useEffect(() => {
        fetchStudentExams(dispatch, "upcoming");
    }, [dispatch]);

    return (
        <>
            {!isFetching && (
                <>
                    <Typography variant="h6" gutterBottom>
                        Upcoming Exams
                    </Typography>
                    <Paper>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            autoHeight
                            disableSelectionOnClick
                        />
                    </Paper>
                </>
            )}
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 0, right: 0, m: 3 }}
                onClick={() => fetchStudentExams(dispatch, "upcoming")}
            >
                <RefreshIcon />
            </Fab>
        </>
    );
};

export default UpcomingExams;
