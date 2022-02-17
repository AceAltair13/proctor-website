import React from "react";
import Navbar from "./Navbar";
// import { Switch, Route } from "react-router-dom";
import Landing from "./Landing";
import About from "./About";
import Features from "./Features";
import { Box, Container } from "@mui/material";
import Footer from "./Footer";
import GetStarted from "./GetStarted";

function Home() {
    return (
        <Box bgcolor="rgb(248, 249, 250)">
            <Navbar />
            <Container>
                <Landing />
                <GetStarted />
                <Features />
                <About />
            </Container>
            <Footer />
        </Box>
    );
}

export default Home;
