import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if(this.props.data){
      var work = this.props.data.work.map(function(work){
        return <div key={work.company}><h3>{work.company}</h3>
            <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
            <p>{work.description[0]}</p>
            <p>{work.description[1]}</p>
            <p>{work.description[2]}</p>
            <p>{work.description[3]}</p>
        </div>
      })
    var education = this.props.data.education.map(function(education){
      if ((education.description).length !== 0) {
        var description = education.description.map((descripto) => {
          return <li>{descripto}</li>
        });
      }
        return <div key={education.school}><h3>{education.school}</h3>
            <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
            <p className="awards">{education.awards[0]}</p>
            <span>{description}</span>
        </div>
    })
    }

    return (
      <section id="resume">
          <div className="row work">
             <div className="three columns header-col">
                <h1><span>Work</span></h1>
             </div>
             <div className="nine columns main-col">
              {work}
            </div>
          </div>
          <div className="row education">
            <div className="three columns header-col">
                <h1><span>Education</span></h1>
            </div>
            <div className="nine columns main-col">
                <div className="row item">
                    <div className="twelve columns">
                        {education}
                    </div>
                </div>
            </div>
          </div>
      </section>
    );
  }
}

export default Resume;
