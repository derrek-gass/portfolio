
import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";



const Scene = ({ vertex, fragment }) => {
    const meshRef = useRef();

    // Load the noise texture and update the shader uniform
    const noiseTexture = useTexture("/images/noise2.png");
    useFrame((state) => {
        let time = state.clock.getElapsedTime();

        // start from 20 to skip first 20 seconds ( optional )
        meshRef.current.material.uniforms.iTime.value = time + 59;
    });

    // Define the shader uniforms with memoization to optimize performance
    const uniforms = useMemo(
        () => ({
            iTime: {
                type: "f",
                value: 0.11,
            },
            iResolution: {
                type: "v2",
                value: new THREE.Vector2(32, 9),
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
            <planeGeometry args={[32, 9]} />
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

function Header(props) {
	if (props.data) {
		const { occupation, description, name: myName, social } = props.data;
		const vertex = props.vertex;
		const fragment = props.fragment;
		var networks = social.map(function (network) {
			return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
		})
		return (
			<header id="home">
				<nav id="nav-wrap">
					<a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
					<a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
					<ul id="nav" className="nav">
						<li className="current"><a className="smoothscroll" href="#home">Home</a></li>
						<li><a className="smoothscroll" href="#about">Bio</a></li>
						<li><a className="smoothscroll" href="#resume">Work</a></li>
						<li><a className="smoothscroll" href="#portfolio">Projects</a></li>
						<li><a className="smoothscroll" href="#testimonials">Testimonials</a></li>
					</ul>
				</nav>
				<div className="row banner">
					<div className="banner-text">
						<h1 className="responsive-headline">{myName}:</h1>
						<h3>
							An extremely dedicated
							<br />
							<span>
								{occupation}
							</span>
							<br />
							{description}
						</h3>
						<hr />
						<ul className="social">
							{networks}
						</ul>
					</div>
				</div>
				<p className="scrolldown">
					<a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
				</p>
				<Canvas style={{height: "100vh", zIndex: -1, position: "absolute", top: 0, left: 0}}>
					<Scene vertex={vertex} fragment={fragment} />
        </Canvas>
			</header>
		);
	}
}

export default Header;
