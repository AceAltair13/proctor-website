import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SupervisorDashboard from "./Supervisor/SupervisorDashboard";
import StudentDashboard from "./Student/StudentDashboard";
import NotFoundError from "../Errors/NotFoundError"

function Dashboard() {
    const user = useSelector((state) => state.user.currentUser);

    if (!user) {
        return <Redirect to="/login" />;
    } else {
        switch(user.role) {
            case "supervisor":
                return <SupervisorDashboard />
            case "student":
                return <StudentDashboard />
            default:
                return <NotFoundError/>
        }
    }
}

export default Dashboard;
