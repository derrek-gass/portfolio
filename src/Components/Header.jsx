function Header(props) {
	if (props.data) {
		const { occupation, description, name: myName, social } = props.data;
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
						<li><a className="smoothscroll" href="#about">About</a></li>
						<li><a className="smoothscroll" href="#resume">Resume</a></li>
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
			</header>
		);
	}
}

export default Header;
