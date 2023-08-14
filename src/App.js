import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from "./Components/Header";
import About from "./Components/About";
import Resume from "./Components/Resume";
import Badges from "./Components/Badges";
import Portfolio from "./Components/Portfolio";
import Testimonials from "./Components/Testimonials";
import Footer from "./Components/Footer";

// TODO: Convert this to functional
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resumeData: {}
        };

        ReactGA.initialize('UA-110570651-1');
        ReactGA.pageview(window.location.pathname);

    }

    getResumeData() {
        $.ajax({
            url: '/resumeData.json',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({ resumeData: data });
            }.bind(this),
            error: function(xhr, status, err) {
                console.log(err);
                alert(err);
            }
        });
    }

    componentDidMount() {
        this.getResumeData();
    }

    render() {
        return ( 
        <div className = "App" >
            <Header data = { this.state.resumeData.main }/>
            <About data = { this.state.resumeData.main }/>
            <Resume data = { this.state.resumeData.resume }/>
            <Badges data = { this.state.resumeData.badges }/>
            <Portfolio data = { this.state.resumeData.portfolio }/>
            <Testimonials data = { this.state.resumeData.testimonials }/>
            <Footer data = { this.state.resumeData.main }/>
        </div>
        );
    }
}

export default App;