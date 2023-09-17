import { Job } from "./Types";

function PortfolioSection(jobs: Job[]) {
  const jobList = Object.values(jobs).map(job => {
    const { company, title, years, description } = job;
    
    const descriptionList = description.map((element: any) => {
      return <p key={element}>{element}</p>;
    });
    
    return (
      <div key={company}>
        <h3>{company}</h3>
        <p className="info">
          {title}
          <span>&bull;</span> <em className="date">{years}</em>
        </p>
        {descriptionList}
      </div>
    );
  });

  return (
    <>
      {jobList}
    </>
  );
}

export default PortfolioSection;
