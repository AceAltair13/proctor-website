import Webcam from "react-webcam";
import React from "react";
import * as faceapi from '@vladmandic/face-api';
import { useSelector } from "react-redux";
import runObjectDetection from "./object";


function App() {
    const webcamRef = React.useRef(null);
    // const [color, setColor] = React.useState("red");
    const userImageLin = useSelector((state) => state.questionPaper.userImageLink);
    const userImageLink_1 = "https://firebasestorage.googleapis.com/v0/b/examinator-2c5f7.appspot.com/o/jetha1.jpg?alt=media&token=a68d1461-9342-4ff2-83d0-574907848437";

    const loadImage = () => {
        const labels = ["Person Found"];
        return Promise.all(
            labels.map(async (label) => {
                console.log(userImageLin);
                var link = "http://127.0.0.1:8081/" + userImageLin
                console.log("final link", link)
                const descriptions = [];
                const img = await faceapi.fetchImage(link);
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
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

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
                    if (result.label === "Person Found") {
                        console.log("Person Found");
                    } else {
                        console.log("Unkown Person");
                    }
                });
                await runObjectDetection(webcamRef);
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

    return (
        <Webcam
            audio={false}
            height={0}
            screenshotQuality={0.8}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={0}
        />
    );
}

export default App;
