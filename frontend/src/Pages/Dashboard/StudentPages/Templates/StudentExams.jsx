import { Fab } from "@mui/material";
import React, { useEffect } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";

const StudentExams = (props) => {
    const { isFetching } = useSelector((state) => state.student);

    useEffect(props.fetchExamFunction, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!isFetching && props.children}
            <Fab
                color="primary"
                sx={{ position: "fixed", bottom: 0, right: 0, m: 3 }}
                onClick={props.fetchExamFunction}
            >
                <RefreshIcon />
            </Fab>
        </>
    );
};

export default StudentExams;
