
import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const NAV_ITEMS = [
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'Bio' },
    { id: 'resume',       label: 'Work' },
    { id: 'portfolio',    label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
];

const Scene = ({ vertex, fragment }) => {
    const meshRef = useRef();

	const noiseTexture = useLoader(THREE.TextureLoader, "/images/noise2.png");
    useFrame((state) => {
        let time = state.clock.getElapsedTime();
        meshRef.current.material.uniforms.iTime.value = time + 59;
    });

    const uniforms = useMemo(
        () => ({
            iTime:       { type: "f",  value: 0.11 },
            iResolution: { type: "v2", value: new THREE.Vector2(32, 9) },
            iChannel0:   { type: "t",  value: noiseTexture },
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
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const ids = NAV_ITEMS.map(item => item.id);
        const targets = ids.map(id => document.getElementById(id)).filter(Boolean);
        const visible = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visible.add(entry.target.id);
                } else {
                    visible.delete(entry.target.id);
                }
            });
            const active = ids.find(id => visible.has(id));
            if (active) setActiveSection(active);
        }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

        targets.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

	if (props.data) {
		const { occupation, description, name: myName, social } = props.data;
		const vertex = props.vertex;
		const fragment = props.fragment;
		const networks = social.map(network => (
			<li key={network.name}><a href={network.url} aria-label={network.name}><i className={network.className}></i></a></li>
		));

		return (
			<header id="home">
				<nav id="nav-wrap">
					<a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
					<a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
					<ul id="nav" className="nav">
						{NAV_ITEMS.map(({ id, label }) => (
							<li key={id} className={activeSection === id ? 'current' : ''}>
								<a className="smoothscroll" href={`#${id}`}>{label}</a>
							</li>
						))}
					</ul>
				</nav>
				<div className="row banner">
					<div className="banner-text">
						<h1 className="responsive-headline">{myName}:</h1>
						<h3>
							An extremely dedicated
							<br />
							<span>{occupation}</span>
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
