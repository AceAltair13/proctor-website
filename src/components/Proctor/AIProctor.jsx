import React, { useEffect, useRef } from "react";
import runObjectDetection from "./modules/object";
import Webcam from "react-webcam";

export default function AIProctor() {
    const webcamRef = useRef(null);
    const videoConstraints = {
        facingMode: "user",
    };

    useEffect(() => {
        runObjectDetection(webcamRef);
    }, []);

    return (
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotQuality={0.8}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            height={0}
            width={0}
        />
    );
}
