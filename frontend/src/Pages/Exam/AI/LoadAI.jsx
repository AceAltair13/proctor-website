import Webcam from "react-webcam";
import React, { useEffect, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import { useDispatch, useSelector } from "react-redux";
import runObjectDetection from "./ObjectDetection";
import { sendExamEvent } from "../../../Api/proctor";
import { flipKnownPerson } from "../../../Features/malpracticeFlagSlice";

function LoadAI({ examId }) {
    const webcamRef = React.useRef(null);
    // const [color, setColor] = React.useState("red");
    const userImageLin = useSelector((state) => state.questionPaper.faceURL);



    // Load malpractice Types reducers
    // const [knownPerson, setKnownPerson] = useState(false);
    // const [knowPersonTrigger, setKnowPersonTrigger] = useState(false);
    // useEffect(() => {
     
    //     setTimeout(() => {
    //         setKnownPerson(false);
    //         console.log("KNOWN PERSON SET TO  "+ knownPerson);
    //     }, 60000);
 
    // }, [knowPersonTrigger])
    

    const knownPerson = useSelector((state) => state.malpracticeTypes.knownPerson);
   
    const [knowPersonTrigger, setKnowPersonTrigger] = useState(false);

    // const {faceDetected,noPerson,multiPerson,mobileFound,laptopFound} = useSelector((state) => state.malpracticeTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        const activate = ()=> {
            dispatch(flipKnownPerson(true));
            setTimeout(() => {
            console.log("Starting activating Unknown person");
            dispatch(flipKnownPerson(false));
            console.log(" UNKNOWN PERSON DETECTION Activated");
        }, 60000);
    }
        if(knownPerson){
        activate();
        }
    
    }, [dispatch,knowPersonTrigger,knownPerson]);
    

    


    const videoConstraints = {
        height: 300,
        width: 350,
        facingMode: "user",
    };

    const loadImage = () => {
        const labels = ["Person Found"];
        return Promise.all(
            labels.map(async (label) => {
                var link = userImageLin;
                const descriptions = [];
                const img = await faceapi.fetchImage(link);
                const detections = await faceapi
                    .detectSingleFace(img)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                descriptions.push(detections.descriptor);
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
                        console.log("Person AUTHENTICATED");
                    }
                    // if(unknownPersonTimeout!=true)
                    else {

                        // upload unknown person malpractice post request
                        console.log("person unkwon is  "+knownPerson);
                        if(knownPerson===false){
                            sendExamEvent(
                                webcamRef.current.getScreenshot(),
                                examId,
                                "UNKNOWN_PERSON"
                                );
                                // console.log("Unkown Person");
                                // setKnownPerson(true);
                                setKnowPersonTrigger(!knowPersonTrigger);
                                // dispatch(flipKnownPerson(true));
                                console.log("unknown person detected and sent to server " + knownPerson);
                            
                            
                        }
                    }
                });
                await runObjectDetection(webcamRef, examId);
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
            style={{zIndex: "-1", position: "absolute", top: "0", left: "0"}}
            audio={false}
            videoConstraints={videoConstraints}
            screenshotQuality={0.8}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
        />
    );
}

export default LoadAI;
