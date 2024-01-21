import { useState, useEffect, useMemo, useRef } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from './Components/Header';
import About from './Components/About';
import Resume from './Components/Resume';
import Badges from './Components/Badges';
import Portfolio from './Components/Portfolio';
import Testimonials from './Components/Testimonials';
import Footer from './Components/Footer';

import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import axios from "axios";


const Scene = ({ vertex, fragment }) => {
    const meshRef = useRef();

    // Load the noise texture and update the shader uniform
    const noiseTexture = useTexture("/images/noise2.png");
    useFrame((state) => {
        let time = state.clock.getElapsedTime();

        // start from 20 to skip first 20 seconds ( optional )
        meshRef.current.material.uniforms.iTime.value = time + 20;
    });

    // Define the shader uniforms with memoization to optimize performance
    const uniforms = useMemo(
        () => ({
            iTime: {
                type: "f",
                value: 0.12,
            },
            iResolution: {
                type: "v2",
                value: new THREE.Vector2(24, 8),
            },
            iChannel0: {
                type: "t",
                value: noiseTexture,
            },
        }),
        [noiseTexture]
    );

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[24, 8]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertex}
                fragmentShader={fragment}
                fog={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

function App() {
    const [resumeData, setResumeData] = useState({});

    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

    useEffect(() => {
        getResumeData();
        axios.get("/shaders/vertexShader.glsl").then((res) => setVertex(res.data));
        axios.get("/shaders/fragmentShader.glsl").then((res) => setFragment(res.data));
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
            <Canvas style={{ width: "100vw", height: "100vh" }}>
                <Scene vertex={vertex} fragment={fragment} />
            </Canvas>
            <About props={resumeData.main} />
            <Resume props={resumeData.resume} />
            <Badges data={resumeData.badges} />
            <Portfolio data={resumeData.portfolio} />
            <Testimonials data={resumeData.testimonials} />
            <Footer data={resumeData.main} />
        </div>
    );
}

export default App;
