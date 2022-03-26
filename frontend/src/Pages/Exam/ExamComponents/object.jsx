// import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

async function runObjectDetection(webcamRef) {
    const net = await cocoSsd.load();
    detect(net, webcamRef);
}

async function detect(net, webcamRef) {
    const video = webcamRef.current.video;
    const predictions = await net.detect(video);
    getPrediction(predictions);
}

function getPrediction(predictions) {
    let count = 0;
    predictions.forEach((obj) => {
        if (obj.score > 0.5) {
            let user = obj.class;
            switch (user) {
                case "person":
                    count++;
                    break;
                case "cell phone":
                    console.log("Cell Phone Detected !")
                    break;
                case "laptop":
                    console.log("Laptop detected !")
                    break;
                default: break;
            }
        }
    });
    if (count > 1) {
        console.log("More than one person detected !")
    } else if (count === 0) {
        console.log("No Person Detected !")
    }
}

export default runObjectDetection;
