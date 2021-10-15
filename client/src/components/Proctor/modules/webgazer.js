function irisTracking() {
    const webgazer = window.webgazer;

    webgazer
        .setGazeListener(function (data, elapsedTime) {
            if (data == null) {
                return;
            }
            console.log(data, elapsedTime); //elapsed time is based on time since begin was called
        })
        .begin();
}

export default irisTracking;