import { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './JobDetails.css';

export default function JobDetails() {
  const { id } = useParams();
  const { jobsWithMatch, saveJob, unsaveJob, savedJobs, applyToJob, isAuthenticated, getAdvancedAIInsights, isCandidatePremium } = useApp();
  const { t } = useLanguage();
  const TABS = [
    { id: 'description', label: t('jobDetails.description') },
    { id: 'requirements', label: t('jobDetails.requirements') },
    { id: 'benefits', label: t('jobDetails.benefits') },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const job = jobsWithMatch.find((j) => j.id === id);
  const [aiInsights, setAiInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  const handleGetAIInsights = () => {
    const result = getAdvancedAIInsights(job?.id);
    if (result.locked) {
      alert(result.message);
      return;
    }
    setAiInsights(result.insights);
  };

  if (!job) {
    return (
      <main className="job-details-page">
        <div className="job-details-container">
          <p>{t('jobDetails.jobNotFound')}</p>
          <Link to="/jobs">{t('jobDetails.backToJobs')}</Link>
        </div>
      </main>
    );
  }

  const isSaved = savedJobs.includes(job.id);

  return (
    <main className="job-details-page">
      <div className="job-details-container">
        <Link to="/jobs" className="back-link">← {t('jobDetails.backToJobs')}</Link>

        <header className="job-details-header">
          <div className="job-title-row">
            <h1>{job.title}</h1>
            <span className={`match-badge ${job.matchScore >= 90 ? 'high' : job.matchScore >= 75 ? 'medium' : 'low'}`}>
              {job.matchScore}% {t('jobs.match')}
            </span>
          </div>
          <div className="company-info">
            <h2>{job.company}</h2>
            <p className="job-meta">
              {job.location} • {job.workType} • {job.employmentType}
              {job.featured && <span className="job-badge featured">{t('jobDetails.featured')}</span>}
              {job.sponsored && <span className="job-badge sponsored">{t('jobDetails.sponsored')}</span>}
            </p>
            <p className="job-salary">
              ${(job.salaryRange.min / 1000).toFixed(0)}k - ${(job.salaryRange.max / 1000).toFixed(0)}k
            </p>
          </div>
        </header>

        <div className="job-details-content">
          <div className="job-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`job-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="job-tab-content">
            {activeTab === 'description' && (
              <motion.section
                className="job-section card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{t('jobDetails.jobDescription')}</h3>
                <p className="job-description">{job.description}</p>
              </motion.section>
            )}
            {activeTab === 'requirements' && (
              <motion.section
                className="job-section card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{t('jobDetails.requiredSkills')}</h3>
                <div className="skills-highlighted">
                  {job.skills.map((skill) => (
                    <span key={skill} className="skill-tag highlighted">{skill}</span>
                  ))}
                </div>
                <div className="job-meta-inline">
                  <p><span>{t('jobDetails.experience')}:</span> {job.experienceLevel}</p>
                  <p><span>{t('jobDetails.posted')}:</span> {job.postedDate}</p>
                  <p><span>{t('jobDetails.deadline')}:</span> {job.deadline}</p>
                </div>
              </motion.section>
            )}
            {activeTab === 'benefits' && (
              <motion.section
                className="job-section card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <h3>{t('jobDetails.benefits')}</h3>
                <ul className="benefits-list">
                  {job.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </motion.section>
            )}
          </div>

          <section className="job-section card match-explanation">
            <h3>{t('jobDetails.whyFits')}</h3>
            <p>{job.matchReason}</p>
            {isAuthenticated && (
              <button className="ai-insights-btn" onClick={handleGetAIInsights}>
                {isCandidatePremium ? t('jobDetails.advancedAi') : `🔒 ${t('jobDetails.advancedAiPremium')}`}
              </button>
            )}
            {aiInsights && (
              <div className="ai-insights-panel">
                <h4>{t('jobDetails.advancedAi')}</h4>
                <ul>
                  <li><strong>{t('jobDetails.skillGap')}:</strong> {aiInsights.skillGapAnalysis?.[0]}</li>
                  <li><strong>{t('jobDetails.salaryBenchmark')}:</strong> {aiInsights.salaryBenchmark}</li>
                  <li><strong>{t('jobDetails.interviewLikelihood')}:</strong> {aiInsights.interviewLikelihood}%</li>
                  <li><strong>{t('jobDetails.competition')}:</strong> {aiInsights.competitorAnalysis}</li>
                </ul>
              </div>
            )}
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
            {!isAuthenticated ? t('jobDetails.loginToApply') : t('common.apply')}
          </button>
          <button
            className={`btn btn-secondary ${isSaved ? 'saved' : ''}`}
            onClick={() => {
              if (!isAuthenticated) navigate('/login', { state: { from: location } });
              else isSaved ? unsaveJob(job.id) : saveJob(job.id);
            }}
          >
            {!isAuthenticated ? t('common.loginToSave') : (isSaved ? `✓ ${t('common.saved')}` : t('jobDetails.saveJob'))}
          </button>
        </div>
      </div>
    </main>
  );
}
