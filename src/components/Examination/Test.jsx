import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { Typography } from "@material-ui/core";
import HotKeys from "react-hot-keys";

function Test() {
    const [model, setModel] = useState();
    const webcamRef = useRef(null);

    async function loadModel() {
        try {
            const model = await cocoSsd.load();
            setModel(model);
            console.log("set loaded Model");
        } catch (err) {
            console.log(err);
            console.log("failed load model");
        }
    }
    useEffect(() => {
        tf.ready().then(() => {
            loadModel();
        });
    }, []);

    async function predictions() {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const predictions = await model.detect(video);
            console.log(predictions);
        }
    }

    const videoConstraints = {
        height: 640,
        width: 480,
        facingMode: "environment",
    };

    function onKeyDown(keyName, e, handle) {
        console.log("test:onKeyDown", keyName, e, handle);
    }

    setInterval(() => predictions(), 500);

    return (
        <>
            <Webcam
                audio={false}
                id="img"
                ref={webcamRef}
                screenshotQuality={1}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <HotKeys keyName="alt+tab, command" onKeyDown={onKeyDown}>
                <Typography variant="h2" color="primary">
                    Examination Page
                </Typography>
            </HotKeys>
        </>
    );
}

export default Test;
