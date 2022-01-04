import { Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { fetchStudentExams } from "../../../Features/apiCalls";

const ExamHistory = () => {
    const dispatch = useDispatch();
    const { past } = useSelector((state) => state.student.exams);
    const rows = past.map((exam, index) => ({
        id: index,
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
    const columns = [
        {
            headerName: "Sr No",
            field: "srNo",
            width: 100,
            type: "number",
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Exam Name",
            field: "examName",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Start",
            field: "startTime",
            width: 200,
            type: "dateTime",
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "End",
            field: "endTime",
            width: 200,
            type: "dateTime",
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Exam Description",
            field: "examDesc",
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            headerName: "Status",
            field: "status",
            width: 200,
            headerAlign: "center",
            align: "center",
        },
    ];

    useEffect(() => {
        fetchStudentExams(dispatch);
    }, [dispatch]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Past Exams
            </Typography>

            <Paper>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight
                    disableRowSelection
                />
            </Paper>
        </>
    );
};

export default ExamHistory;
