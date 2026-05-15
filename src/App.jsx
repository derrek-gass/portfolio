import { useState, useEffect } from "react";
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

function App() {
    const [resumeData, setResumeData] = useState({});
    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

    useEffect(() => {
        Promise.all([
            fetch("/shaders/vertexShader.glsl").then(r => r.text()),
            fetch("/shaders/fragmentShader.glsl").then(r => r.text()),
            fetch("/resumeData.json").then(r => r.json()),
        ]).then(([vert, frag, data]) => {
            setVertex(vert);
            setFragment(frag);
            setResumeData(data);
        }).catch(console.error);
    }, []);

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
