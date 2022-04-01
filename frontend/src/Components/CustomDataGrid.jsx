import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Paper } from "@mui/material";

const CustomDataGrid = (props) => {
    const { rows, columns, ...other } = props;
    const { isFetching } = useSelector((state) => state.dashboard);

    return (
        <Paper
            sx={{
                "& .custom-data-grid--isCorrect": {
                    bgcolor: "rgb(0, 255, 0, 0.2)",
                },
            }}
            elevation={4}
        >
            <DataGrid
                rows={isFetching ? [] : rows}
                columns={columns}
                loading={isFetching}
                autoHeight
                disableSelectionOnClick
                getRowClassName={(params) => {
                    if (params.row.isCorrect) {
                        return "custom-data-grid--isCorrect";
                    }
                }}
                {...other}
            />
        </Paper>
    );
};

CustomDataGrid.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

CustomDataGrid.defaultProps = {
    rows: [],
    columns: [],
};

export default CustomDataGrid;
