import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SupervisorDashboard from "./Supervisor/SupervisorDashboard";
import StudentDashboard from "./Student/StudentDashboard";

function Dashboard() {
    const user = useSelector((state) => state.user.value);

    if (!user) {
        return <Redirect to="/login" />;
    } else {
        if (user.isSupervisor) {
            return <SupervisorDashboard />;
        } else if (user.isStudent) {
            return <StudentDashboard />;
        }
    }
}

export default Dashboard;
