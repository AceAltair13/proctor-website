import UpcomingIcon from "@mui/icons-material/Upcoming";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import VideocamIcon from "@mui/icons-material/Videocam";
import MyExams from "../SupervisorPages/MyExams";
import UpcomingExams from "../StudentPages/UpcomingExams";
import MyResults from "../StudentPages/MyResults";
import CreateExam from "../SupervisorPages/CreateExam";
import StudentMonitoring from "../SupervisorPages/StudentMonitoring";
import Results from "../SupervisorPages/Results";
import Profile from "../CommonPages/Profile";
import ChangePassword from "../CommonPages/ChangePassword";

const studentDrawerItems = [
    {
        subheader: "Exam",
        items: [
            {
                text: "Exams",
                icon: <UpcomingIcon />,
                to: "/dashboard/exam/exams",
                component: UpcomingExams,
            },
            {
                text: "My Results",
                icon: <EqualizerIcon />,
                to: "/dashboard/exam/history",
                component: MyResults,
            },
        ],
    },
];

const supervisorDrawerItems = [
    {
        subheader: "Exam",
        items: [
            {
                text: "My Exams",
                icon: <SchoolIcon />,
                to: "/dashboard/exam/my-exams",
                component: MyExams,
            },
            {
                text: "Create Exam",
                icon: <AddIcon />,
                to: "/dashboard/exam/create-exam",
                component: CreateExam,
            },
            {
                text: "Student Monitoring",
                icon: <VideocamIcon />,
                to: "/dashboard/exam/student-monitoring",
                component: StudentMonitoring,
            },
            {
                text: "Results",
                icon: <EqualizerIcon />,
                to: "/dashboard/exam/results",
                component: Results,
            },
        ],
    },
];

const commonDrawerItems = [
    {
        subheader: "Profile",
        items: [
            {
                text: "Profile",
                icon: <PersonIcon />,
                to: "/dashboard/profile",
                component: Profile,
            },
            {
                text: "Change Password",
                icon: <VpnKeyIcon />,
                to: "/dashboard/profile/change-password",
                component: ChangePassword,
            },
        ],
    },
];

export const drawerItems = {
    student: [...studentDrawerItems, ...commonDrawerItems],
    supervisor: [...supervisorDrawerItems, ...commonDrawerItems],
};
