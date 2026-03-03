import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './RecommendedJobsCard.css';

export default function RecommendedJobsCard() {
  const { jobsWithMatch, saveJob, unsaveJob, savedJobs, isAuthenticated } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [toast, setToast] = useState(null);
  const recommendedJobs = jobsWithMatch.slice(0, 4);

  const handleSaveClick = (jobId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (savedJobs.includes(jobId)) {
      unsaveJob(jobId);
      setToast({ message: t('common.jobRemovedFromSaved'), type: 'info' });
    } else {
      saveJob(jobId);
      setToast({ message: t('common.jobSaved'), type: 'success' });
    }
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <motion.div
      className="recommended-jobs-card card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="card-header">
        <h2>🤖 AI Recommended Jobs</h2>
        <Link to="/jobs" className="view-all-link">View All</Link>
      </div>
      <div className="jobs-list jobs-grid">
        {recommendedJobs.map((job, i) => (
          <motion.div
            key={job.id}
            className="job-match-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.3 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <div className="job-card-logo">
              {job.company?.slice(0, 2).toUpperCase() || 'CO'}
            </div>
            <div className="job-card-body">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="location">{job.location} • {job.workType}</p>
              <div className="job-match">
                <span className={`match-badge ${job.matchScore >= 90 ? 'high' : job.matchScore >= 75 ? 'medium' : 'low'}`}>
                  {job.matchScore}% {t('jobs.match')}
                </span>
              </div>
            </div>
            <p className="match-reason">{job.matchReason}</p>
            <div className="job-actions">
              <Link to={`/jobs/${job.id}`} className="btn btn-primary">{t('common.viewDetails')}</Link>
              <button
                className={`btn btn-secondary ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                onClick={() => handleSaveClick(job.id)}
              >
                {!isAuthenticated ? t('common.loginToSave') : (savedJobs.includes(job.id) ? `✓ ${t('common.saved')}` : t('common.save'))}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`job-toast job-toast--${toast.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
