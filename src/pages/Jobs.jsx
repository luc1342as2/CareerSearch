import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Jobs.css';

export default function Jobs() {
  const { jobsWithMatch, saveJob, unsaveJob, savedJobs, isAuthenticated } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({
    industry: '',
    workType: '',
    experienceLevel: '',
    sortBy: 'match',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobsWithMatch
    .filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = !filters.industry || job.industry === filters.industry;
      const matchesWorkType = !filters.workType || job.workType === filters.workType;
      const matchesExperience =
        !filters.experienceLevel || job.experienceLevel === filters.experienceLevel;
      return matchesSearch && matchesIndustry && matchesWorkType && matchesExperience;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'match') return b.matchScore - a.matchScore;
      if (filters.sortBy === 'date') return new Date(b.postedDate) - new Date(a.postedDate);
      if (filters.sortBy === 'salary') return b.salaryRange.max - a.salaryRange.max;
      return 0;
    });

  const industries = [...new Set(jobsWithMatch.map((j) => j.industry))];
  const workTypes = [...new Set(jobsWithMatch.map((j) => j.workType))];
  const experienceLevels = [...new Set(jobsWithMatch.map((j) => j.experienceLevel))];

  return (
    <main className="jobs-page">
      <div className="jobs-layout">
        <aside className="jobs-sidebar">
          <div className="filters-card card">
            <h2>{t('jobs.filters')}</h2>
            <div className="filter-group">
              <label>{t('jobs.search')}</label>
              <input
                type="text"
                placeholder={t('jobs.search') + '...'}
                className="filter-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>{t('jobs.industry')}</label>
              <select
                value={filters.industry}
                onChange={(e) => setFilters((f) => ({ ...f, industry: e.target.value }))}
              >
                <option value="">{t('jobs.allIndustries')}</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>{t('jobs.workType')}</label>
              <select
                value={filters.workType}
                onChange={(e) => setFilters((f) => ({ ...f, workType: e.target.value }))}
              >
                <option value="">{t('jobs.all')}</option>
                {workTypes.map((wt) => (
                  <option key={wt} value={wt}>{wt}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>{t('jobs.experienceLevel')}</label>
              <select
                value={filters.experienceLevel}
                onChange={(e) => setFilters((f) => ({ ...f, experienceLevel: e.target.value }))}
              >
                <option value="">{t('jobs.all')}</option>
                {experienceLevels.map((el) => (
                  <option key={el} value={el}>{el}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>{t('jobs.sortBy')}</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value }))}
              >
                <option value="match">{t('jobs.matchSort')}</option>
                <option value="date">{t('jobs.datePosted')}</option>
                <option value="salary">{t('jobs.salary')}</option>
              </select>
            </div>
            <button
              className="clear-filters-btn"
              onClick={() => {
                setFilters({ industry: '', workType: '', experienceLevel: '', sortBy: 'match' });
                setSearchQuery('');
              }}
            >
              {t('jobs.clearFilters')}
            </button>
          </div>
        </aside>

        <section className="jobs-main">
          <h1>{t('jobs.jobListings')}</h1>
          <p className="jobs-count">{filteredJobs.length} {t('jobs.jobsFound')}</p>
          <div className="jobs-grid">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                className="job-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="job-card-header">
                  <div>
                    <h3>
                      <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                    </h3>
                    <p className="company">{job.company}</p>
                  </div>
                  <span className={`match-badge ${job.matchScore >= 90 ? 'high' : job.matchScore >= 75 ? 'medium' : 'low'}`}>
                    {job.matchScore}% {t('jobs.match')}
                  </span>
                </div>
                <p className="job-location">{job.location} • {job.workType}</p>
                <p className="job-salary">
                  ${(job.salaryRange.min / 1000).toFixed(0)}k - ${(job.salaryRange.max / 1000).toFixed(0)}k
                </p>
                <div className="job-card-actions">
                  {isAuthenticated ? (
                    <Link to={`/jobs/${job.id}`} className="btn btn-primary">{t('common.apply')}</Link>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate('/login', { state: { from: location } })}
                    >
                      {t('jobs.loginToApply')}
                    </button>
                  )}
                  <button
                    className={`btn btn-secondary ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                    onClick={() => {
                      if (!isAuthenticated) navigate('/login', { state: { from: location } });
                      else savedJobs.includes(job.id) ? unsaveJob(job.id) : saveJob(job.id);
                    }}
                  >
                    {!isAuthenticated ? t('common.loginToSave') : (savedJobs.includes(job.id) ? `✓ ${t('common.saved')}` : t('common.save'))}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
