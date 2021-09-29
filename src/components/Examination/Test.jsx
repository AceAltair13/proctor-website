import React, { useEffect, useState, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { Typography } from "@material-ui/core";
import HotKeys from "react-hot-keys";

function Test() {
    const [model, setModel] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const webcamRef = useRef(null);

    async function loadModel() {
        try {
            const model = await cocoSsd.load();
            setModel(model);
            setIsLoaded(true);
            console.log("set loaded Model");
        } catch (err) {
            console.log(err);
            console.log("failed load model");
        }
    }
    useEffect(() => {
        tf.ready().then(() => {
            loadModel();
            tf.setBackend("webgl")
            console.log("Tensorflow running in " + tf.getBackend())
        });
    }, []);

    async function predictions() {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4 &&
            isLoaded
        ) {
            const video = webcamRef.current.video;
            const predictions = await model.detect(video);
            let count = 0
            predictions.forEach(x => {
                let name = x.class
                let score = x.score
                if (score > 0.55) {
                    if (name === "cell phone") {
                        console.log("cell phone detected !")
                    }
                    if (name === "person") {
                        count++
                    }
                }
                if (count > 1) {
                    console.log("More than one person detected !")
                } else if (count === 0) {
                    console.log("No person detected !")
                }
            })
        }
    }

    const videoConstraints = {
        height: 480,
        width: 640,
        facingMode: "environment",
    };

    function onKeyDown(keyName, e, handle) {
        console.log("test:onKeyDown", keyName, e, handle);
    }

    setInterval(predictions, 500);

    return (
        <>
            <Webcam
                audio={false}
                id="img"
                ref={webcamRef}
                screenshotQuality={1}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                style={{position: "absolute"}}
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
