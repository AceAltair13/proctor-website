import React from "react";
import { Container } from "@material-ui/core";
import Header from "./Header";
import Navbar from "./Navbar";
import Feature from "./Feature";
import Feature1 from "../../images/feature1.svg";
import Feature2 from "../../images/feature2.svg";
import Feature3 from "../../images/feature3.svg";

function Website() {
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Header />
                <Feature
                    title="Create Examinations With Ease"
                    imageUrl={Feature1}
                >
                    This is the body of the feature. The body is intended to be
                    bigger. This is some more sample text to fill the remaining
                    spaces.
                </Feature>
                <Feature
                    title="AI Enabled Proctoring System"
                    imageUrl={Feature2}
                    reverse={true}
                >
                    This is the body of the feature. The body is intended to be
                    bigger. This is some more sample text to fill the remaining
                    spaces.
                </Feature>
                <Feature
                    title="Generate Results In No Time"
                    imageUrl={Feature3}
                >
                    This is the body of the feature. The body is intended to be
                    bigger. This is some more sample text to fill the remaining
                    spaces.
                </Feature>
            </Container>
        </>
    );
}

export default Website;
