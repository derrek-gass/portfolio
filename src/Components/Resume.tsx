import PortfolioSection from "./PortfolioSection";

function Resume(props: any) {
    if (props.props !== undefined) {

    var education = props.props.education.map(function (education: any) {
            if (education.description.length !== 0) {
                var description = education.description.map((descripto: any) => {
                    return (
                        <div className="description">
                            <span>&bull; </span>
                            {descripto}
                        </div>
                    );
                });
            }

            return (
                <div key={education.school}>
                    <h3>{education.school}</h3>
                    <p className="info">
                        {education.degree} <span>&bull;</span>
                        <em className="date">{education.graduated}</em>
                        {education.awards.length !== 0 && (
                            <>
                                <span>&bull;</span>
                                <em className="awards">
                                    {education.awards[0]}
                                </em>
                            </>
                        )}
                    </p>
                    <p>{description}</p>
                </div>
            );
        });

        return (
            <section id="resume">
                <div className="row work">
                    <div className="three columns header-col">
                        <h1>
                            <span>Work</span>
                        </h1>
                    </div>
                    <div className="nine columns main-col">
                        <PortfolioSection {...props.props.work} />
                    </div>
                </div>
                <div className="row projects">
                        <div className="three columns header-col">
                            <h1>
                                <span>Projects</span>
                            </h1>
                        </div>
                    <div className="nine columns main-col">
                    <PortfolioSection {...props.props.projects} />
                    </div>
                    </div>
                    <div className="row education">
                        <div className="three columns header-col">
                            <h1>
                                <span>Education</span>
                            </h1>
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
