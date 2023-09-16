import { ResumeData } from "./Types";


// function PortfolioSection(work: Job) {
//     return work.map(job => {
//         const { company, title, years, description } = job;

//         const descriptionList = description.map((element) => {
//             return <p>{element}</p>
//         })
    
//         return (
//             <div key={company}>
//                 <h3>{company}</h3>
//                 <p className="info">
//                     {title}
//                     <span>&bull;</span>{" "}
//                     <em className="date">{years}</em>
//                 </p>
//                 {descriptionList}
//             </div>
//         );
//     })
// }

// render() {
//     if (this.props.data) {
//         var work = this.props.data.work.map((work) => {
//             const { company, title, years, description } = work;
//             return (
//                 <div key={company}>
//                     <h3>{company}</h3>
//                     <p className="info">
//                       {title}
//                         <span>&bull;</span>{" "}
//                         <em className="date">{years}</em>
//                     </p>
//                     <p>{description[0]}</p>
//                     <p>{description[1]}</p>
//                     <p>{description[2]}</p>
//                     <p>{description[3]}</p>
//                 </div>
//             );
//         });

//         var projects = this.props.data.projects.map((work) => {
//             const { company, title, years, description } = work;
//             return (
//                 <div key={company}>
//                     <h3>{company}</h3>
//                     <p className="info">
//                       {title}
//                         <span>&bull;</span>{" "}
//                         <em className="date">{years}</em>
//                     </p>
//                     <p>{description[0]}</p>
//                     <p>{description[1]}</p>
//                     <p>{description[2]}</p>
//                     <p>{description[3]}</p>
//                 </div>
//             );
//         })

//         var education = this.props.data.education.map(function (education) {
//             if (education.description.length !== 0) {
//                 var description = education.description.map((descripto) => {
//                     return (
//                         <div className="description">
//                             <span>&bull; </span>
//                             {descripto}
//                         </div>
//                     );
//                 });
//             }

//             return (
//                 <div key={education.school}>
//                     <h3>{education.school}</h3>
//                     <p className="info">
//                         {education.degree} <span>&bull;</span>
//                         <em className="date">{education.graduated}</em>
//                         {education.awards.length !== 0 && (
//                             <>
//                                 <span>&bull;</span>
//                                 <em className="awards">
//                                     {education.awards[0]}
//                                 </em>
//                             </>
//                         )}
//                     </p>
//                     <p>{description}</p>
//                 </div>
//             );
//         });
//     }



function Resume(props: ResumeData) {
    // const { work, projects, education } = props;
    console.info(props);

    return (
            <section id="resume">
                <div className="row work">
                    <div className="three columns header-col">
                        <h1>
                            <span>Work</span>
                        </h1>
                    </div>
                    <div className="nine columns main-col">
                    
                    </div>
                </div>
                {/* <div className="row projects">
                    <div className="three columns header-col">
                        <h1>
                            <span>Projects</span>
                        </h1>
                    </div>
                    <div className="nine columns main-col">{projects}</div>
                </div>
                <div className="row education">
                    <div className="three columns header-col">
                        <h1>
                            <span>Education</span>
                        </h1>
                    </div>
                    <div className="nine columns main-col">
                        <div className="row item">
                            <div className="twelve columns">{education}</div>
                        </div>
                    </div>
                </div> */}
            </section>
        );
    }

export default Resume;
