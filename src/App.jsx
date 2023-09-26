import { useState, useEffect } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import {
    Header,
    About,
    Resume,
    Badges,
    Portfolio,
    Testimonials,
    Footer,
} from "./Components";

function App() {
    const [resumeData, setResumeData] = useState({});

    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);

    useEffect(() => {
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
            <Header data={resumeData.main} />
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
