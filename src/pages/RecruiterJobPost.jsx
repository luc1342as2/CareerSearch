import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './RecruiterJobPost.css';

export default function RecruiterJobPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { postedJobs, updatePostedJob, removePostedJob, user } = useApp();
  const job = postedJobs.find((j) => j.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(job ? { ...job } : null);

  if (!job || !form) {
    return (
      <main className="recruiter-job-post-page">
        <div className="recruiter-job-post-container">
          <p>{t('recruiter.jobNotFound')}</p>
          <Link to="/recruiter">{t('recruiter.backToDashboard')}</Link>
        </div>
      </main>
    );
  }

  const handleSave = () => {
    updatePostedJob(id, form);
    setIsEditing(false);
  };

  const handleRemove = () => {
    if (window.confirm(t('recruiter.confirmRemoveJob'))) {
      removePostedJob(id);
      navigate('/recruiter');
    }
  };

  return (
    <main className="recruiter-job-post-page">
      <div className="recruiter-job-post-container">
        <div className="recruiter-job-post-header">
          <Link to="/recruiter" className="recruiter-job-post-back">← {t('recruiter.backToDashboard')}</Link>
          <div className="recruiter-job-post-actions">
            {isEditing ? (
              <>
                <button className="btn btn-secondary" onClick={() => { setIsEditing(false); setForm({ ...job }); }}>{t('common.cancel')}</button>
                <button className="btn btn-primary" onClick={handleSave}>{t('common.save')}</button>
              </>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>{t('common.edit')}</button>
                <button className="btn btn-danger" onClick={handleRemove}>{t('recruiter.removeJob')}</button>
              </>
            )}
          </div>
        </div>

        <article className="recruiter-job-post-card card">
          {isEditing ? (
            <div className="recruiter-job-post-form">
              <div className="form-row">
                <label>{t('recruiter.jobTitleLabel')}</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t('recruiter.jobTitlePlaceholder')} />
              </div>
              <div className="form-row">
                <label>{t('recruiter.companyLabel')}</label>
                <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder={user?.company || 'Company'} />
              </div>
              <div className="form-row">
                <label>{t('recruiter.locationLabel')}</label>
                <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Remote" />
              </div>
              <div className="form-row form-row-split">
                <div>
                  <label>{t('recruiter.salaryMinLabel')}</label>
                  <input type="number" value={form.salaryRange?.min ? form.salaryRange.min / 1000 : ''} onChange={(e) => setForm({ ...form, salaryRange: { ...form.salaryRange, min: (parseInt(e.target.value) || 0) * 1000 } })} placeholder="80" />
                </div>
                <div>
                  <label>{t('recruiter.salaryMaxLabel')}</label>
                  <input type="number" value={form.salaryRange?.max ? form.salaryRange.max / 1000 : ''} onChange={(e) => setForm({ ...form, salaryRange: { ...form.salaryRange, max: (parseInt(e.target.value) || 0) * 1000 } })} placeholder="120" />
                </div>
              </div>
              <div className="form-row">
                <label>{t('recruiter.descriptionLabel')}</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder={t('recruiter.descriptionPlaceholder')} />
              </div>
              <div className="form-row">
                <label>{t('recruiter.skills')}</label>
                <input value={(form.skills || []).join(', ')} onChange={(e) => setForm({ ...form, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} placeholder="React, TypeScript, Node.js" />
              </div>
              <div className="form-row">
                <label>{t('recruiter.workTypeLabel')}</label>
                <select value={form.workType} onChange={(e) => setForm({ ...form, workType: e.target.value })}>
                  <option value="Remote">{t('profile.remote')}</option>
                  <option value="Hybrid">{t('profile.hybrid')}</option>
                  <option value="On-site">{t('profile.onsite')}</option>
                </select>
              </div>
              <div className="form-row">
                <label>{t('recruiter.employmentTypeLabel')}</label>
                <select value={form.employmentType} onChange={(e) => setForm({ ...form, employmentType: e.target.value })}>
                  <option value="Full-time">{t('profile.fullTime')}</option>
                  <option value="Part-time">{t('profile.partTime')}</option>
                  <option value="Contract">{t('profile.contract')}</option>
                  <option value="Freelance">{t('profile.freelance')}</option>
                </select>
              </div>
            </div>
          ) : (
            <>
              <div className="recruiter-job-post-meta">
                <span className="recruiter-job-post-status">{job.status}</span>
                <span className="recruiter-job-post-date">{t('jobDetails.posted')}: {job.postedDate}</span>
              </div>
              <h1>{job.title}</h1>
              <p className="recruiter-job-post-company">{job.company}</p>
              <div className="recruiter-job-post-stats">
                <span>{job.applicants} {t('recruiter.applicants')}</span>
                <span>{job.views} {t('recruiter.views')}</span>
              </div>
              <div className="recruiter-job-post-details">
                <p><strong>{t('jobDetails.jobDescription')}</strong></p>
                <p>{job.description}</p>
                <p><strong>{t('recruiter.locationLabel')}</strong> {job.location}</p>
                <p><strong>{t('profile.workType')}</strong> {job.workType} • {job.employmentType}</p>
                {job.salaryRange && (
                  <p><strong>{t('profile.salary')}</strong> ${(job.salaryRange.min / 1000).toFixed(0)}k - ${(job.salaryRange.max / 1000).toFixed(0)}k</p>
                )}
                {job.skills?.length > 0 && (
                  <p><strong>{t('recruiter.skills')}</strong> {job.skills.join(', ')}</p>
                )}
              </div>
            </>
          )}
        </article>
      </div>
    </main>
  );
}
