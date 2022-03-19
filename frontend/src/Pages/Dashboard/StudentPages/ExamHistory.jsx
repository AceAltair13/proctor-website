import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { fetchStudentExams } from "../../../Api/student";
import RefreshablePage from "../CommonPages/RefreshablePage";
import CustomDataGrid from "../../../Components/CustomDataGrid";

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
        <RefreshablePage
            title="Exams History"
            fetchExamFunction={fetchExamsHistory}
        >
            <CustomDataGrid rows={rows} columns={columns} />
        </RefreshablePage>
    );
};

export default ExamHistory;
