import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const CustomDataGrid = (props) => {
    const { rows, columns, ...other } = props;
    const { isFetching } = useSelector((state) => state.dashboard);

    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                "& .custom-data-grid--isCorrect": {
                    bgcolor: "rgb(0, 255, 0, 0.2)",
                },
            }}
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
        </Box>
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
