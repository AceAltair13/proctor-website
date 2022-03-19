import {
    Avatar,
    Box,
    Breadcrumbs,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import RefreshablePage from "../../CommonPages/RefreshablePage";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import EditIcon from "@mui/icons-material/Edit";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useParams, useRouteMatch } from "react-router-dom";
import { getExamDetailsForSupervisor } from "../../../../Api/supervisor";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
    setSelectedExam,
    setSelectedQuestionPaper,
} from "../../../../Features/supervisorSlice";

const ManageExam = () => {
    const params = useParams();
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const getExam = () => getExamDetailsForSupervisor(dispatch, params.examId);
    const { examName } = useSelector((state) => state.supervisor.selectedExam);

    useEffect(() => {
        dispatch(setSelectedExam({}));
        dispatch(setSelectedQuestionPaper([]));
    }, [dispatch, params.examId]);

    const manageExamItems = [
        {
            icon: DescriptionIcon,
            color: "primary.main",
            text: "Manage Question Bank",
            path: `${url}/manage-question-paper`,
        },
        {
            icon: PeopleIcon,
            color: "secondary.main",
            text: "Manage Students",
            path: `${url}/manage-students`,
        },
        {
            icon: QuestionAnswerIcon,
            color: "warning.main",
            text: "View Responses",
            path: `${url}/view-responses`,
        },
        {
            icon: EditIcon,
            color: "success.main",
            text: "Edit Exam",
            path: `${url}/edit-exam`,
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
                <Typography>{examName ? examName : "Loading..."}</Typography>
            </Breadcrumbs>
            <RefreshablePage fetchExamFunction={getExam}>
                {examName ? (
                    <Grid container spacing={4}>
                        {manageExamItems.map((item, index) => (
                            <Grid item lg={3} md={6} sm={12} xs={12}>
                                <Card key={index}>
                                    <CardActionArea
                                        component={RouterLink}
                                        to={item.path}
                                    >
                                        <CardContent sx={{ p: 4 }}>
                                            <Stack>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: item.color,
                                                            width: 56,
                                                            height: 56,
                                                            mb: 3,
                                                        }}
                                                    >
                                                        <item.icon />
                                                    </Avatar>
                                                </Box>
                                                <Typography
                                                    variant="h6"
                                                    textAlign="center"
                                                >
                                                    {item.text}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    textAlign="center"
                                                >
                                                    {item.subText}
                                                </Typography>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box />
                )}
            </RefreshablePage>
        </>
    );
};

export default ManageExam;