// Root URL
const URL = "http://localhost:8080/api";

// Auth
const STUDENT_REGISTER_URL = "/user/register-student";
const SUPERVISOR_REGISTER_URL = "/user/register-supervisor";
const LOGIN_URL = "/user/login";
const LOGOUT_URL = "/user/logout";

// Exam
const FETCH_EXAMS_URL = "/exam";
const FETCH_UPCOMING_EXAM_URL = "/exam/upcoming";
const FETCH_PAST_EXAM_URL = "/exam/history";
const FETCH_CURRENT_EXAM_URL = "/exam/current";

// Proctor
const UPLOAD_FACE_URL = "/proctor/upload-face";

// Module Exports
export {
    URL,
    STUDENT_REGISTER_URL,
    SUPERVISOR_REGISTER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    FETCH_EXAMS_URL,
    FETCH_CURRENT_EXAM_URL,
    FETCH_PAST_EXAM_URL,
    FETCH_UPCOMING_EXAM_URL,
    UPLOAD_FACE_URL,
};
