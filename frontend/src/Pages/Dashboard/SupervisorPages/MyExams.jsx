import { Button, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSupervisorExams } from "../../../Api/supervisor";
import RefreshablePage from "../CommonPages/RefreshablePage";

const columnSchema = [
    {
        headerName: "Sr No",
        field: "srNo",
        width: 100,
        headerAlign: "center",
        align: "center",
    },
    {
        headerName: "Exam Name",
        field: "examName",
        width: 200,
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
    },
    {
        headerName: "Created At",
        field: "createdAt",
        width: 200,
        type: "dateTime",
        headerAlign: "center",
        align: "center",
    },
    {
        headerName: "Exam Description",
        field: "examDescription",
        width: 200,
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
    },
    {
        headerName: "Starts At",
        field: "startsAt",
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    {
        headerName: "Ends At",
        field: "endsAt",
        width: 200,
        headerAlign: "center",
        align: "center",
    },
    // {
    //     headerName: "Actions",
    //     field: "actions",
    //     type: "actions",
    //     getActions: (params) => [
    //         <GridActionsCellItem
    //             icon={<DeleteIcon />}
    //             onClick={() => {
    //                 console.log(params.id);
    //             }}
    //         />,
    //         <GridActionsCellItem
    //             icon={<EditIcon />}
    //             onClick={() => {
    //                 console.log(params.id);
    //             }}
    //         />,
    //         <GridActionsCellItem
    //             icon={<DescriptionIcon />}
    //             onClick={() => {
    //                 console.log(params.id);
    //             }}
    //         />,
    //     ],
    //     headerAlign: "center",
    //     align: "center",
    //     minWidth: 200,
    //     flex: 1,
    // },
    {
        headerName: "Actions",
        field: "actions",
        renderCell: (params) => {
            return (
                <Stack direction="row" spacing={1}>
                    <Button
                        color="error"
                        size="small"
                        onClick={() => {
                            console.log(params.id);
                        }}
                    >
                        Delete
                    </Button>
                    <Button
                        size="small"
                        onClick={() => {
                            console.log(params.id);
                        }}
                    >
                        Edit
                    </Button>
                </Stack>
            );
        },
        headerAlign: "center",
        align: "center",
        minWidth: 200,
        flex: 1,
    },
];

const MyExams = () => {
    const dispatch = useDispatch();
    const { exams } = useSelector((state) => state.supervisor);
    const getSupervisorExamsFunc = () => getSupervisorExams(dispatch);
    const rows = exams.map((exam, index) => ({
        id: exam.examId,
        srNo: index + 1,
        examName: exam.examName,
        createdAt: DateTime.fromISO(exam.createdAt).toLocaleString(
            DateTime.DATETIME_MED
        ),
        examDescription: exam.examDesc,
        startsAt: DateTime.fromISO(exam.examStartTime).toLocaleString(
            DateTime.DATETIME_MED
        ),
        endsAt: DateTime.fromISO(exam.examEndTime).toLocaleString(
            DateTime.DATETIME_MED
        ),
    }));
    const columns = useMemo(() => columnSchema, []);

    return (
        <RefreshablePage fetchExamFunction={getSupervisorExamsFunc}>
            <Paper>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    disableSelectionOnClick
                />
            </Paper>
        </RefreshablePage>
    );
};

export default MyExams;
