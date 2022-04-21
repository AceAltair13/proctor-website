import React, { useState } from "react";
import {
    Avatar,
    Breadcrumbs,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Link,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import {
    Link as RouterLink,
    useHistory,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LightBox from "react-image-lightbox";
import BadgeIcon from "@mui/icons-material/Badge";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BarChartIcon from "@mui/icons-material/Equalizer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CustomCard from "../../../../Components/CustomCard";
import Chart from "react-apexcharts";
import { fetchSingleStudentResponseForSupervisor } from "../../../../Api/supervisor";
import RefreshablePage from "../../CommonPages/RefreshablePage";

const eventList = [
    {
        icon: <BadgeIcon />,
        title: "Face Not Detected",
        code: "NO_PERSON_DETECTED",
        count: 134,
    },
    {
        icon: <BadgeIcon />,
        title: "Unknown Person",
        code: "UNKNOWN_PERSON",
        count: 24,
    },
    {
        icon: <BadgeIcon />,
        title: "Multiple Faces Detected",
        code: "MORE_THAN_ONE_PERSON_DETECTED",
        count: 55,
    },
    {
        icon: <BadgeIcon />,
        title: "Mobile Detected",
        code: "CELL_PHONE_DETECTED",
        count: 197,
    },
    {
        icon: <BadgeIcon />,
        title: "Laptop Detected",
        code: "LAPTOP_DETECTED",
        count: 12,
    },
    // {
    //     icon: <BadgeIcon />,
    //     title: "Noise Detected",
    //     code: "NOISE_DETECTED",
    //     count: 120,
    // },
    {
        icon: <BadgeIcon />,
        title: "Full Screen Exited",
        code: "FULL_SCREEN_EXIT",
        count: 13,
    },
    {
        icon: <BadgeIcon />,
        title: "Tab Changed",
        code: "TAB_CHANGED",
        count: 12,
    },
    {
        icon: <BadgeIcon />,
        title: "Inspect Element",
        code: "INSPECT_ELEMENT_OPENED",
        count: 5,
    },
];

const ViewStudentResponse = () => {
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const { url } = useRouteMatch();
    const { studentId } = useParams();
    const { totalMarks } = useSelector(
        (state) => state.supervisor.studentResponses
    );
    const {
        studentImageURL,
        studentFirstName,
        studentLastName,
        studentMarksScored,
        studentResponse,
        studentEmailId,
        studentPhoneNumber,
        events
    } = useSelector((state) => state.supervisor.selectedStudentResponse);
    const [isOpen, setIsOpen] = useState(false);
    const { examId, examName } = useSelector(
        (state) => state.supervisor.selectedExam
    );
    const fetchSingleStudentResponse = () =>
        fetchSingleStudentResponseForSupervisor(dispatch, examId, studentId);
    const _eventList = eventList.map((event) => ({
        ...event,
        count: events.find((response) => response.eventName === event.code)?.eventCount ?? 0,
    }));

    const StudentDetailItem = ({ title, content }) => {
        return (
            <Stack>
                <Typography variant="body1" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="h6" fontWeight="fontWeightBold">
                    {content}
                </Typography>
            </Stack>
        );
    };

    const IncidentCard = ({ icon, incidentType, incidentCount, onClick }) => {
        return (
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card
                    sx={{
                        borderLeft: `10px solid ${theme.palette.secondary.main}`,
                    }}
                    elevation={4}
                >
                    <CardActionArea onClick={onClick}>
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.secondary.main,
                                    }}
                                >
                                    {icon}
                                </Avatar>
                            }
                            title={incidentType}
                            subheader={`Number of occurrences: ${incidentCount}`}
                            action={
                                <IconButton disabled>
                                    <ChevronRightIcon />
                                </IconButton>
                            }
                        />
                    </CardActionArea>
                </Card>
            </Grid>
        );
    };

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
                <Link
                    color="black"
                    underline="hover"
                    component={RouterLink}
                    to={`/dashboard/exam/my-exams/${examId}/view-responses`}
                >
                    View Responses
                </Link>
                <Typography>{studentId}</Typography>
            </Breadcrumbs>
            <RefreshablePage fetchExamFunction={fetchSingleStudentResponse}>
                <Grid container spacing={4}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <CustomCard
                            title="Student Details"
                            icon={<BadgeIcon />}
                        >
                            <Grid container spacing={2} alignItems="stretch">
                                <Grid item lg={8} md={8} sm={12} xs={12}>
                                    <Stack spacing={2}>
                                        <StudentDetailItem
                                            title="Student ID"
                                            content={studentId}
                                        />
                                        <StudentDetailItem
                                            title="Student Name"
                                            content={`${studentFirstName} ${studentLastName}`}
                                        />
                                        <StudentDetailItem
                                            title="Student Email"
                                            content={studentEmailId}
                                        />
                                        <StudentDetailItem
                                            title="Student Phone"
                                            content={studentPhoneNumber}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <Card variant="outlined">
                                        <CardActionArea
                                            onClick={() => setIsOpen(true)}
                                        >
                                            <CardContent>
                                                <Stack spacing={1}>
                                                    <img
                                                        src={studentImageURL}
                                                        alt="Student"
                                                        onClick={() =>
                                                            setIsOpen(true)
                                                        }
                                                        height="auto"
                                                        width="100%"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        textAlign="center"
                                                    >
                                                        Candidate's Registered
                                                        Face
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Grid>
                        </CustomCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <CustomCard title="Performance" icon={<BarChartIcon />}>
                            <Chart
                                series={[totalMarks - studentMarksScored, studentMarksScored]}
                                type="pie"
                                options={{
                                    labels: ["Incorrect", "Correct"],
                                    dataLabels: {
                                        formatter: (val) => val,
                                    },
                                }}
                            />
                            <Stack pl={2}>
                                <StudentDetailItem
                                    title="Score"
                                    content={`${studentMarksScored} / ${totalMarks}`}
                                />
                            </Stack>
                        </CustomCard>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomCard
                            title="Incidents"
                            icon={<WarningAmberIcon />}
                        >
                            <Grid container spacing={4} justifyContent="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Incident Summary
                                    </Typography>
                                </Grid>
                                <Grid item lg={8} md={8} sm={12} xs={12}>
                                    <Chart
                                        type="bar"
                                        options={{
                                            plotOptions: {
                                                bar: {
                                                    horizontal: true,
                                                },
                                            },
                                        }}
                                        series={[
                                            {
                                                data: _eventList.map(
                                                    (event) => ({
                                                        x: event.title,
                                                        y: event.count,
                                                    })
                                                ),
                                            },
                                        ]}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Incident Breakdown
                                    </Typography>
                                </Grid>
                                {_eventList.map((event, index) => (
                                    <IncidentCard
                                        key={index}
                                        icon={event.icon}
                                        incidentType={event.title}
                                        incidentCount={event.count}
                                        onClick={() =>
                                            history.push(
                                                `${url}/view-incidents/${event.code}`
                                            )
                                        }
                                    />
                                ))}
                            </Grid>
                        </CustomCard>
                    </Grid>
                </Grid>
                {isOpen && (
                    <LightBox
                        mainSrc={studentImageURL}
                        onCloseRequest={() => setIsOpen(false)}
                        reactModalStyle={{
                            overlay: {
                                zIndex: theme.zIndex.drawer + 1,
                            },
                        }}
                    />
                )}
            </RefreshablePage>
        </>
    );
};

export default ViewStudentResponse;
