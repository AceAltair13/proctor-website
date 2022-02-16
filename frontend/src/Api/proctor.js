import { UPLOAD_FACE_URL } from "../Constants/urls";
import { imageUploadRequest } from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";
import { setFaceRegistered } from "../Features/questionPaperSlice";
import FormData from "form-data";

export const uploadPreExamFace = async (dispatch, image, examId) => {
    console.log("uploadpreexam", image);
    const formData = new FormData();
    formData.append("image", image);
    // formData.append("type", uploadType);
    formData.append("exam", examId);
    try {
        await imageUploadRequest.post(UPLOAD_FACE_URL, formData).then(() => {
            dispatch(setFaceRegistered(true));
            snackActions.success("Face uploaded successfully");
        });
    } catch (error) {
        snackActions.error(error.response.data);
    }
};
