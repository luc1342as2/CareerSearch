import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockPostedJobs, mockCandidates, mockRecruiterAnalytics, mockJobs } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './RecruiterDashboard.css';

export default function RecruiterDashboard() {
  const { t } = useLanguage();
  const {
    shortlistedCandidates,
    shortlistCandidate,
    unshortlistCandidate,
    inviteCandidateToInterview,
    invitedCandidates,
    isRecruiterSubscribed,
    canAccessCandidate,
    createFeaturedJobPost,
    createPaidJobPosting,
    createSponsoredListing,
    useAIFiltering,
  } = useApp();
  const [selectedJob, setSelectedJob] = useState('1');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteDate, setInviteDate] = useState('');
  const [inviteTime, setInviteTime] = useState('');
  const [toast, setToast] = useState(null);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [filters, setFilters] = useState({
    minMatch: '',
    experience: '',
    availability: '',
    skill: '',
    location: '',
  });
  const [sortField, setSortField] = useState('matchScore');
  const [sortDir, setSortDir] = useState('desc');

  const aiFilterResult = useAIFiltering(filters);
  const allSkills = [...new Set(mockCandidates.flatMap((c) => c.skills || []))];
  const allLocations = [...new Set(mockCandidates.map((c) => c.location).filter(Boolean))];

  let filteredCandidates = mockCandidates
    .filter((c) => c.jobId === selectedJob)
    .filter((c) => !filters.minMatch || c.matchScore >= parseInt(filters.minMatch))
    .filter((c) => !filters.experience || c.experience.includes(filters.experience))
    .filter((c) => !filters.availability || c.availability.toLowerCase().includes(filters.availability.toLowerCase()))
    .filter((c) => !filters.skill || (c.skills || []).some((s) => s.toLowerCase().includes(filters.skill.toLowerCase())))
    .filter((c) => !filters.location || c.location?.toLowerCase().includes(filters.location.toLowerCase()));

  const handleSort = (field) => {
    setSortField(field);
    setSortDir((d) => (sortField === field && d === 'desc' ? 'asc' : 'desc'));
  };

  filteredCandidates = [...filteredCandidates].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number') return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
    return sortDir === 'desc'
      ? String(bVal).localeCompare(String(aVal))
      : String(aVal).localeCompare(String(bVal));
  });

  const previewCandidate = selectedCandidate || filteredCandidates[0];
  const selectedJobData = mockPostedJobs.find((j) => j.id === selectedJob) || mockJobs.find((j) => j.id === selectedJob);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleViewFullProfile = () => {
    if (previewCandidate) setShowProfileModal(true);
  };

  const handleShortlist = () => {
    if (!previewCandidate) return;
    const isShortlisted = shortlistedCandidates.includes(previewCandidate.id);
    if (isShortlisted) {
      unshortlistCandidate(previewCandidate.id);
      showToast(`${previewCandidate.fullName} ${t('recruiter.removedFromShortlist')}`, 'info');
    } else {
      shortlistCandidate(previewCandidate.id);
      showToast(`${previewCandidate.fullName} ${t('recruiter.addedToShortlist')}`);
    }
  };

  const handleEmailCandidate = () => {
    if (!previewCandidate?.email) return;
    const subject = encodeURIComponent(`Regarding your application - ${selectedJobData?.title || 'Job'}`);
    const body = encodeURIComponent(`Hi ${previewCandidate.fullName},\n\nThank you for your application. We would like to discuss your profile further.\n\nBest regards`);
    window.location.href = `mailto:${previewCandidate.email}?subject=${subject}&body=${body}`;
    showToast(`${t('recruiter.emailCandidate')} → ${previewCandidate.email}`);
  };

  const handleInviteToInterview = () => {
    if (!previewCandidate) return;
    setShowInviteModal(true);
  };

  const handleInviteSubmit = () => {
    if (!inviteDate || !inviteTime || !previewCandidate) return;
    inviteCandidateToInterview(previewCandidate.id, `${inviteDate} at ${inviteTime}`);
    showToast(`${t('recruiter.interviewInviteSent')} ${previewCandidate.fullName}`);
    setShowInviteModal(false);
    setInviteDate('');
    setInviteTime('');
  };

  const handleDownloadCV = () => {
    if (!previewCandidate) return;
    const cvContent = `
CURRICULUM VITAE
================

${previewCandidate.fullName}
${previewCandidate.email || ''}
${previewCandidate.phone || ''}
${previewCandidate.location}

MATCH SCORE: ${previewCandidate.matchScore}%

PROFESSIONAL SUMMARY
${previewCandidate.summary || 'Experienced professional.'}

EXPERIENCE
${previewCandidate.experience}

EDUCATION
${previewCandidate.education || 'N/A'}

SKILLS
${(previewCandidate.skills || []).join(', ')}

AVAILABILITY
${previewCandidate.availability}

---
Generated by CareerSearch - Smart Job Match
    `.trim();

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${previewCandidate.fullName.replace(/\s+/g, '_')}_CV.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('recruiter.cvDownloaded'));
  };

  return (
    <main className="recruiter-dashboard">
      <div className="recruiter-container">
        <header className="recruiter-header">
          <h1>{t('recruiter.dashboard')}</h1>
          {isRecruiterSubscribed && <span className="subscriber-badge">{t('recruiter.subscribed')}</span>}
          <button className="post-job-btn" onClick={() => setShowPostJobModal(true)}>+ {t('recruiter.postNewJob')}</button>
        </header>

        <section className="analytics-overview">
          <h2 className="analytics-section-title">{t('recruiter.analyticsDashboard')}</h2>
          <div className="analytics-card card">
            <span className="analytics-icon">📋</span>
            <div>
              <span className="analytics-value">{mockRecruiterAnalytics.totalApplicants}</span>
              <span className="analytics-label">{t('recruiter.totalApplicants')}</span>
            </div>
          </div>
          <div className="analytics-card card">
            <span className="analytics-icon">💼</span>
            <div>
              <span className="analytics-value">{mockRecruiterAnalytics.activeJobs}</span>
              <span className="analytics-label">{t('recruiter.activeJobs')}</span>
            </div>
          </div>
          <div className="analytics-card card">
            <span className="analytics-icon">📅</span>
            <div>
              <span className="analytics-value">{mockRecruiterAnalytics.interviewsScheduled}</span>
              <span className="analytics-label">{t('recruiter.interviewsScheduled')}</span>
            </div>
          </div>
          <div className="analytics-card card">
            <span className="analytics-icon">⏱️</span>
            <div>
              <span className="analytics-value">{mockRecruiterAnalytics.avgTimeToHire}</span>
              <span className="analytics-label">{t('recruiter.avgTimeToHire')}</span>
            </div>
          </div>
          <div className="analytics-card card">
            <span className="analytics-icon">⚡</span>
            <div>
              <span className="analytics-value">{mockRecruiterAnalytics.avgResponseTime || '6.5 hrs'}</span>
              <span className="analytics-label">{t('recruiter.avgResponseTime')}</span>
            </div>
          </div>
          <div className="analytics-card card analytics-top-applicants">
            <span className="analytics-icon">🏆</span>
            <div>
              <span className="analytics-value">
                {filteredCandidates.length > 0
                  ? filteredCandidates.slice(0, 3).map((c) => c.matchScore).join('%, ') + '%'
                  : '—'}
              </span>
              <span className="analytics-label">{t('recruiter.topMatchScores')}</span>
            </div>
          </div>
        </section>

        <div className="recruiter-main-layout">
          <section className="posted-jobs-section card">
            <h2>{t('recruiter.postedJobs')}</h2>
            <div className="posted-jobs-list">
              {mockPostedJobs.map((job) => (
                <div
                  key={job.id}
                  className={`posted-job-item ${selectedJob === job.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedJob(job.id);
                    setSelectedCandidate(null);
                  }}
                >
                  <div className="job-item-main">
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                  <div className="job-item-stats">
                    <span>{job.applicants} {t('recruiter.applicants')}</span>
                    <span>{job.views} {t('recruiter.views')}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="candidates-section">
            <div className="filters-panel card">
              <h3>{t('recruiter.filters')} {isRecruiterSubscribed && <span className="ai-badge">AI</span>}</h3>
              <div className="filter-row">
                <label>{t('recruiter.minMatch')}</label>
                <select
                  value={filters.minMatch}
                  onChange={(e) => setFilters((f) => ({ ...f, minMatch: e.target.value }))}
                >
                  <option value="">{t('recruiter.any')}</option>
                  <option value="80">80%+</option>
                  <option value="85">85%+</option>
                  <option value="90">90%+</option>
                  <option value="95">95%+</option>
                </select>
              </div>
              <div className="filter-row">
                <label>{t('recruiter.skillFilter')}</label>
                <select
                  value={filters.skill}
                  onChange={(e) => setFilters((f) => ({ ...f, skill: e.target.value }))}
                >
                  <option value="">{t('recruiter.any')}</option>
                  {allSkills.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="filter-row">
                <label>{t('recruiter.experience')}</label>
                <select
                  value={filters.experience}
                  onChange={(e) => setFilters((f) => ({ ...f, experience: e.target.value }))}
                >
                  <option value="">{t('recruiter.any')}</option>
                  <option value="3">{t('recruiter.years3')}</option>
                  <option value="4">{t('recruiter.years4')}</option>
                  <option value="5">{t('recruiter.years5')}</option>
                </select>
              </div>
              <div className="filter-row">
                <label>{t('recruiter.locationFilter')}</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                >
                  <option value="">{t('recruiter.any')}</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div className="filter-row">
                <label>{t('recruiter.availability')}</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters((f) => ({ ...f, availability: e.target.value }))}
                >
                  <option value="">{t('recruiter.any')}</option>
                  <option value="immediate">{t('recruiter.immediate')}</option>
                  <option value="weeks">{t('recruiter.within2Weeks')}</option>
                  <option value="month">{t('recruiter.within1Month')}</option>
                </select>
              </div>
            </div>

            <div className="candidates-list card">
              <h2>{t('recruiter.aiRankedCandidates')}</h2>
              <div className="candidates-table-wrapper">
                <table className="candidates-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('fullName')} className="sortable">
                        {t('recruiter.name')} {sortField === 'fullName' && (sortDir === 'desc' ? '↓' : '↑')}
                      </th>
                      <th onClick={() => handleSort('matchScore')} className="sortable">
                        {t('recruiter.match')} {sortField === 'matchScore' && (sortDir === 'desc' ? '↓' : '↑')}
                      </th>
                      <th onClick={() => handleSort('experience')} className="sortable">
                        {t('recruiter.experience')} {sortField === 'experience' && (sortDir === 'desc' ? '↓' : '↑')}
                      </th>
                      <th onClick={() => handleSort('location')} className="sortable">
                        {t('recruiter.locationFilter')} {sortField === 'location' && (sortDir === 'desc' ? '↓' : '↑')}
                      </th>
                      <th onClick={() => handleSort('availability')} className="sortable">
                        {t('recruiter.availability')} {sortField === 'availability' && (sortDir === 'desc' ? '↓' : '↑')}
                      </th>
                      <th>{t('recruiter.skills')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidates.map((candidate, idx) => {
                      const access = canAccessCandidate(idx);
                      return (
                        <tr
                          key={candidate.id}
                          className={`${selectedCandidate?.id === candidate.id ? 'selected' : ''} ${!access.allowed ? 'locked' : ''}`}
                          onClick={() => access.allowed && setSelectedCandidate(candidate)}
                        >
                          <td><strong>{candidate.fullName}</strong></td>
                          <td><span className={`match-badge ${candidate.matchScore >= 90 ? 'high' : 'medium'}`}>{candidate.matchScore}%</span></td>
                          <td>{candidate.experience}</td>
                          <td>{candidate.location}</td>
                          <td>{candidate.availability}</td>
                          <td>
                            {!access.allowed ? (
                              <span className="lock-badge">Subscribe to view</span>
                            ) : (
                              candidate.skills.slice(0, 3).map((s) => (
                                <span key={s} className="skill-pill">{s}</span>
                              ))
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <aside className="candidate-preview card">
            <h3>{t('recruiter.quickPreview')}</h3>
            {previewCandidate ? (
              <div className="preview-content">
                <div className="preview-header">
                  <div className="preview-avatar">{previewCandidate.fullName[0]}</div>
                  <div>
                    <h4>{previewCandidate.fullName}</h4>
                    <span className={`preview-match ${previewCandidate.matchScore >= 90 ? 'high' : 'medium'}`}>
                      {previewCandidate.matchScore}% {t('jobs.match')}
                    </span>
                  </div>
                </div>
                <div className="preview-details">
                  <p><span>{t('recruiter.experience')}:</span> {previewCandidate.experience}</p>
                  <p><span>{t('recruiter.locationFilter')}:</span> {previewCandidate.location}</p>
                  <p><span>{t('recruiter.availability')}:</span> {previewCandidate.availability}</p>
                </div>
                <div className="preview-skills">
                  <strong>{t('recruiter.skills')}</strong>
                  <div className="skill-pills">
                    {previewCandidate.skills.map((s) => (
                      <span key={s} className="skill-pill">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="preview-actions">
                  <button className="btn btn-primary" onClick={handleViewFullProfile}>{t('recruiter.viewFullProfile')}</button>
                  <button
                    className={`btn btn-secondary ${shortlistedCandidates.includes(previewCandidate.id) ? 'shortlisted' : ''}`}
                    onClick={handleShortlist}
                  >
                    {shortlistedCandidates.includes(previewCandidate.id) ? `✓ ${t('recruiter.shortlisted')}` : t('recruiter.shortlist')}
                  </button>
                  <button
                    className={`btn btn-secondary ${invitedCandidates.some((i) => i.candidateId === previewCandidate.id) ? 'invited' : ''}`}
                    onClick={handleInviteToInterview}
                  >
                    {invitedCandidates.some((i) => i.candidateId === previewCandidate.id) ? `✓ ${t('recruiter.invited')}` : t('recruiter.inviteToInterview')}
                  </button>
                  <button className="btn btn-outline" onClick={handleEmailCandidate} title={previewCandidate.email}>{t('recruiter.emailCandidate')}</button>
                  <button className="btn btn-outline" onClick={handleDownloadCV}>{t('recruiter.downloadCv')}</button>
                </div>
              </div>
            ) : (
              <p className="no-candidates">{t('recruiter.noCandidates')}</p>
            )}
          </aside>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && previewCandidate && (
          <motion.div
            className="recruiter-modal-overlay"
            onClick={() => setShowProfileModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="recruiter-modal card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
            <div className="recruiter-modal-header">
              <h3>Full Profile — {previewCandidate.fullName}</h3>
              <button className="modal-close" onClick={() => setShowProfileModal(false)} aria-label="Close">×</button>
            </div>
            <div className="recruiter-modal-body">
              <div className="profile-section">
                <h4>Contact</h4>
                <p>{previewCandidate.email}</p>
                <p>{previewCandidate.phone}</p>
                <p>{previewCandidate.location}</p>
                {previewCandidate.linkedIn && (
                  <a href={`https://${previewCandidate.linkedIn}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                )}
              </div>
              <div className="profile-section">
                <h4>{t('recruiter.matchScore')}</h4>
                <p className="match-value">{previewCandidate.matchScore}%</p>
              </div>
              <div className="profile-section">
                <h4>{t('recruiter.summary')}</h4>
                <p>{previewCandidate.summary}</p>
              </div>
              <div className="profile-section">
                <h4>Experience</h4>
                <p>{previewCandidate.experience}</p>
              </div>
              <div className="profile-section">
                <h4>{t('profile.education')}</h4>
                <p>{previewCandidate.education}</p>
              </div>
              <div className="profile-section">
                <h4>{t('recruiter.skills')}</h4>
                <div className="skill-pills">
                  {previewCandidate.skills.map((s) => (
                    <span key={s} className="skill-pill">{s}</span>
                  ))}
                </div>
              </div>
              <div className="profile-section">
                <h4>{t('recruiter.availability')}</h4>
                <p>{previewCandidate.availability}</p>
              </div>
              {selectedJobData?.title && (
                <div className="profile-section">
                  <h4>{t('recruiter.appliedFor')}</h4>
                  <p>{selectedJobData.title}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && previewCandidate && (
          <motion.div
            className="recruiter-modal-overlay"
            onClick={() => setShowInviteModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="recruiter-modal card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
            <div className="recruiter-modal-header">
              <h3>{t('recruiter.inviteToInterview')}</h3>
              <button className="modal-close" onClick={() => setShowInviteModal(false)} aria-label={t('cv.close')}>×</button>
            </div>
            <div className="recruiter-modal-body">
              <p className="invite-candidate-name">{previewCandidate.fullName}</p>
              <div className="form-group">
                <label>{t('recruiter.date')}</label>
                <input type="date" value={inviteDate} onChange={(e) => setInviteDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>{t('recruiter.time')}</label>
                <input type="time" value={inviteTime} onChange={(e) => setInviteTime(e.target.value)} />
              </div>
              <button className="btn btn-primary invite-submit-btn" onClick={handleInviteSubmit} disabled={!inviteDate || !inviteTime}>
                {t('recruiter.sendInvite')}
              </button>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostJobModal && (
          <motion.div
            className="recruiter-modal-overlay"
            onClick={() => setShowPostJobModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="recruiter-modal card post-job-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
            <div className="recruiter-modal-header">
              <h3>{t('recruiter.postNewJobTitle')}</h3>
              <button className="modal-close" onClick={() => setShowPostJobModal(false)} aria-label={t('cv.close')}>×</button>
            </div>
            <div className="recruiter-modal-body">
              <p className="post-job-desc">{t('recruiter.chooseHowToPost')}</p>
              <div className="post-job-options">
                {isRecruiterSubscribed && (
                  <button
                    className="post-option featured"
                    onClick={() => {
                      const r = createFeaturedJobPost({ title: 'New Job' });
                      if (r.success) showToast(t('recruiter.featuredJobCreated'));
                      setShowPostJobModal(false);
                    }}
                  >
                    <span className="option-icon">⭐</span>
                    <strong>{t('recruiter.featured')}</strong>
                    <span>{t('recruiter.includedInSub')}</span>
                  </button>
                )}
                <button
                  className="post-option paid"
                  onClick={() => {
                    const r = createPaidJobPosting({ title: 'New Job' }, 49);
                    showToast(r.message);
                    setShowPostJobModal(false);
                  }}
                >
                  <span className="option-icon">💰</span>
                  <strong>{t('recruiter.paidPosting')}</strong>
                  <span>{t('recruiter.paidOneTime')}</span>
                </button>
                <button
                  className="post-option sponsored"
                  onClick={() => {
                    const r = createSponsoredListing('new', 7, 15);
                    showToast(r.message);
                    setShowPostJobModal(false);
                  }}
                >
                  <span className="option-icon">📢</span>
                  <strong>{t('recruiter.sponsoredListing')}</strong>
                  <span>{t('recruiter.sponsoredDesc')}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {toast && (
        <div className={`recruiter-toast recruiter-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
