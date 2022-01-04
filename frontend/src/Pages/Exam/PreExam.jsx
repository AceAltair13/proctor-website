import React from "react";
import { useParams } from "react-router-dom";

const PreExam = () => {
    const { id } = useParams();

    return (
        <>
            <h1>PreExam</h1>
            <h2>{id}</h2>
        </>
    );
};

export default PreExam;
