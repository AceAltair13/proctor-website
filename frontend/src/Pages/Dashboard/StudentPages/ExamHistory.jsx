import { Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import { fetchStudentExams } from "../../../Api/exam";
import StudentExams from "./Templates/StudentExams";

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

const ExamHistory = () => {
    const dispatch = useDispatch();
    const exams = useSelector((state) => state.student.exams.history);
    const rows = exams.map((exam, index) => ({
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
    const fetchExamsHistory = () => fetchStudentExams(dispatch, "history");

    return (
        <StudentExams
            title="Exams History"
            fetchExamFunction={fetchExamsHistory}
        >
            <Paper>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    autoHeight
                    disableRowSelection
                />
            </Paper>
        </StudentExams>
    );
};

export default ExamHistory;
