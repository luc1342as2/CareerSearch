import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const { jobs, saveJob, unsaveJob, savedJobs, applyToJob, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <main className="job-details-page">
        <div className="job-details-container">
          <p>Job not found.</p>
          <Link to="/jobs">Back to Jobs</Link>
        </div>
      </main>
    );
  }

  const isSaved = savedJobs.includes(job.id);

  return (
    <main className="job-details-page">
      <div className="job-details-container">
        <Link to="/jobs" className="back-link">← Back to Jobs</Link>

        <header className="job-details-header">
          <div className="job-title-row">
            <h1>{job.title}</h1>
            <span className={`match-badge ${job.matchScore >= 90 ? 'high' : job.matchScore >= 75 ? 'medium' : 'low'}`}>
              {job.matchScore}% match
            </span>
          </div>
          <div className="company-info">
            <h2>{job.company}</h2>
            <p className="job-meta">
              {job.location} • {job.workType} • {job.employmentType}
            </p>
            <p className="job-salary">
              ${(job.salaryRange.min / 1000).toFixed(0)}k - ${(job.salaryRange.max / 1000).toFixed(0)}k
            </p>
          </div>
        </header>

        <div className="job-details-content">
          <section className="job-section card">
            <h3>Job Description</h3>
            <p className="job-description">{job.description}</p>
          </section>

          <section className="job-section card">
            <h3>Required Skills</h3>
            <div className="skills-highlighted">
              {job.skills.map((skill) => (
                <span key={skill} className="skill-tag highlighted">{skill}</span>
              ))}
            </div>
          </section>

          <section className="job-section card">
            <h3>Benefits</h3>
            <ul className="benefits-list">
              {job.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </section>

          <section className="job-section card match-explanation">
            <h3>Why this job matches you</h3>
            <p>{job.matchReason}</p>
          </section>

          <section className="job-section job-meta-section">
            <p><span>Experience:</span> {job.experienceLevel}</p>
            <p><span>Posted:</span> {job.postedDate}</p>
            <p><span>Deadline:</span> {job.deadline}</p>
          </section>
        </div>

        <div className="job-details-actions">
          <button
            className="btn btn-primary"
            onClick={() => {
              if (!isAuthenticated) navigate('/login', { state: { from: location } });
              else applyToJob(job.id);
            }}
          >
            {!isAuthenticated ? 'Login to Apply' : 'Apply'}
          </button>
          <button
            className={`btn btn-secondary ${isSaved ? 'saved' : ''}`}
            onClick={() => {
              if (!isAuthenticated) navigate('/login', { state: { from: location } });
              else isSaved ? unsaveJob(job.id) : saveJob(job.id);
            }}
          >
            {!isAuthenticated ? 'Login to Save' : (isSaved ? '✓ Saved' : 'Save Job')}
          </button>
        </div>
      </div>
    </main>
  );
}
