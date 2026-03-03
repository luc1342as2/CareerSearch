import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './RecommendedJobsCard.css';

export default function RecommendedJobsCard() {
  const { jobs, saveJob, unsaveJob, savedJobs, isAuthenticated } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const recommendedJobs = jobs.slice(0, 3);

  const handleSaveClick = (jobId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (savedJobs.includes(jobId)) {
      unsaveJob(jobId);
      setToast({ message: 'Job removed from saved', type: 'info' });
    } else {
      saveJob(jobId);
      setToast({ message: 'Job saved!', type: 'success' });
    }
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="recommended-jobs-card card">
      <div className="card-header">
        <h2>🤖 AI Recommended Jobs</h2>
        <Link to="/jobs" className="view-all-link">View All</Link>
      </div>
      <div className="jobs-list">
        {recommendedJobs.map((job) => (
          <div key={job.id} className="job-item">
            <div className="job-main">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
                <p className="location">{job.location} • {job.workType}</p>
              </div>
              <div className="job-match">
                <span className={`match-badge ${job.matchScore >= 90 ? 'high' : job.matchScore >= 75 ? 'medium' : 'low'}`}>
                  {job.matchScore}% match
                </span>
              </div>
            </div>
            <p className="match-reason">{job.matchReason}</p>
            <div className="job-actions">
              <Link to={`/jobs/${job.id}`} className="btn btn-primary">View Details</Link>
              <button
                className={`btn btn-secondary ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                onClick={() => handleSaveClick(job.id)}
              >
                {!isAuthenticated ? 'Login to Save' : (savedJobs.includes(job.id) ? '✓ Saved' : 'Save')}
              </button>
            </div>
          </div>
        ))}
      </div>
      {toast && (
        <div className={`job-toast job-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
