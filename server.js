const express = require("express");
const path = require("path");
const app = express();

let port = 3000;
// ip="192.168.43.80"
let ip = "192.168.0.100";
app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port, ip, function () {
    console.log("server is running on :", ip);
});
