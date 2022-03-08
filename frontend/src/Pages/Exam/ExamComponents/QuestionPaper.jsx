import React from "react";
import { Grid } from "@mui/material";
import ExamHeader from "./ExamHeader";
import ExamMain from "./ExamMain";
import ExamFooter from "./ExamFooter";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const QuestionPaper = () => {
  const { userId } = useSelector((state) => state.user.currentUser);
  const { exam } = useSelector((state) => state.exam);
  const { currentQuestionId, questions, totalQuestions } = useSelector(
    (state) => state.questionPaper
  );
  const userImageLink  = useSelector((state) => state.questionPaper.userImageLink);

  const webcamRef = React.useRef(null);

  const loadImage = () => {
    const labels = ["Person Found"];
    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        const imageLink="http://127.0.0.1:8081/"+userImageLink
        const img = await faceapi.fetchImage(
            
        //   "http://127.0.0.1:8081/https://firebasestorage.googleapis.com/v0/b/examinator-2c5f7.appspot.com/o/rushil.PNG?alt=media&token=3ef8199e-fc8f-43d4-ae04-3781341ad98f"
            // if(userImageLink===""){
            // }

            imageLink
           
        );
        console.log(imageLink)
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);
        alert("Image loaded");
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  };

  const recognizeFaces = React.useCallback(async () => {
    const labeledDescriptors = await loadImage();
    console.log(labeledDescriptors);
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);

    setInterval(async () => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const detections = await faceapi
          .detectAllFaces(webcamRef.current.video)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, {
          width: 300,
          height: 300,
        });

        const results = resizedDetections.map((d) => {
          return faceMatcher.findBestMatch(d.descriptor);
        });
        results.forEach((result, _) => {
          console.log(result.label);
          // if (result.label === "Person Found") {
          //     setColor("green");
          // } else {
          //     setColor("red");
          // }
        });
      }
    }, 1000);
  }, []);

  React.useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(
        "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/a86f011d72124e5fb93e59d5c4ab98f699dd5c9c/weights/face_recognition_model-weights_manifest.json"
      ),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/a86f011d72124e5fb93e59d5c4ab98f699dd5c9c/weights/face_landmark_68_model-weights_manifest.json"
      ),
      faceapi.nets.ssdMobilenetv1.loadFromUri(
        "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/a86f011d72124e5fb93e59d5c4ab98f699dd5c9c/weights/ssd_mobilenetv1_model-weights_manifest.json"
      ),
    ]).then(recognizeFaces);
  }, [recognizeFaces]);

  //Post request toi send picture to server for face auth
  // const sendPicture = (picture) => {
  //     console.log("send picture to server");
  //     const url = "http://localhost:5000/api/face-auth";
  //     const data = {
  //         userId: userId,
  //         examId: exam.id,
  //         questionId: currentQuestionId,
  //         picture: picture,
  //     };
  //     fetch(url, {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //     })
  //         .then((response) => response.json())
  //         .then((data) => {
  //             console.log(data);
  //         })
  //         .catch((error) => {
  //             console.error("Error:", error);
  //         });
  // };

  // setInterval(() => {
  //     sendPicture(document.getElementById("image").src);
  // }, 5000);

  return (
    questions.length > 0 && (
      <>
        <Webcam
          hidden={true}
          height={0}
          width={0}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
        <Grid
          height="100vh"
          direction="column"
          spacing={0}
          justifyContent="space-between"
          container
        >
          <Grid item>
            <ExamHeader userId={userId} examName={exam.examName} />
            <ExamMain
              currentQuestionId={currentQuestionId}
              question={questions[currentQuestionId].question}
              options={questions[currentQuestionId].options}
              totalQuestions={totalQuestions}
              selectedOption={questions[currentQuestionId].selectedOption}
              weightage={questions[currentQuestionId].weightage}
            />
          </Grid>
          <Grid item container py={3}>
            <ExamFooter
              currentQuestion={questions[currentQuestionId]}
              currentQuestionId={currentQuestionId}
              totalQuestions={totalQuestions}
            />
          </Grid>
        </Grid>
      </>
    )
  );
};

export default QuestionPaper;
