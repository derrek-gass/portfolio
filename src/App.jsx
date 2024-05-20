import { useState, useEffect, useMemo, useRef } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from '@vercel/analytics/react';
import Header from './Components/Header';
import About from './Components/About';
import Resume from './Components/Resume';
import Badges from './Components/Badges';
import Portfolio from './Components/Portfolio';
import Testimonials from './Components/Testimonials';
import Footer from './Components/Footer';

import axios from "axios";


function App() {
    const [resumeData, setResumeData] = useState({});

    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

    useEffect(() => {
        axios.get("/shaders/vertexShader.glsl").then((res) => setVertex(res.data));
        axios.get("/shaders/fragmentShader.glsl").then((res) => setFragment(res.data));
        getResumeData();
    }, []);


    const getResumeData = () => {
        $.ajax({
            url: "/resumeData.json",
            dataType: "json",
            cache: false,
            success: function (data) {
                setResumeData(data);
            },
            error: function (xhr, status, err) {
                console.log(err);
                alert(err);
            },
        });
    };

    return (
        <div className="App">
            <Header data={resumeData.main} vertex={vertex} fragment={fragment} />
            <About props={resumeData.main} />
            <Resume props={resumeData.resume} />
            <Badges data={resumeData.badges} />
            <Portfolio data={resumeData.portfolio} />
            <Testimonials data={resumeData.testimonials} />
            <Footer data={resumeData.main} />
            <SpeedInsights/> 
            <Analytics />
        </div>
    );
}

export default App;
