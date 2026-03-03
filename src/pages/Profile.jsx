import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import UpdateCvButton from '../components/UpdateCvButton';
import SkillsTagInput from '../components/SkillsTagInput';
import './Profile.css';

export default function Profile() {
  const { t } = useLanguage();
  const {
    user,
    updateUser,
    isCandidatePremium,
    canSeeProfileViewers,
    getProfileViewersList,
    boostProfile,
    isProfileBoosted,
    canUploadVideoCV,
  } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="profile-header card">
          <div className="profile-header-top">
            <div className="profile-completion profile-completion-wrapper">
              <div className="completion-label">
                <span>{t('profile.completeness')}</span>
                <strong>{user.profileStrength}%</strong>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${user.profileStrength}%` }}
                />
              </div>
            </div>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? t('common.cancel') : t('common.edit')}
            </button>
          </div>

          {user.matchImprovementSuggestions?.length > 0 && (
            <div className="improve-suggestions">
              <h3>{t('profile.improveMatch')}</h3>
              <ul>
                {user.matchImprovementSuggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          {user?.role === 'candidate' && (
            <div className="profile-premium-actions">
              {isProfileBoosted() && <span className="boost-badge">{t('profile.profileBoosted')}</span>}
              {isCandidatePremium && !isProfileBoosted() && (
                <button className="boost-btn" onClick={() => boostProfile()}>
                  {t('profile.boostProfile')}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="profile-sections">
          <section className="profile-section card">
            <h2>{t('profile.personalInfo')}</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">{t('profile.fullName')}</span>
                <span className="value">{user.fullName}</span>
              </div>
              <div className="info-item">
                <span className="label">{t('login.email')}</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="label">{t('profile.phone')}</span>
                <span className="value">{user.phone || '—'}</span>
              </div>
              <div className="info-item">
                <span className="label">{t('profile.location')}</span>
                <span className="value">{user.location}</span>
              </div>
            </div>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.experience')}</h2>
            <ul className="experience-list">
              {user.experience.map((exp, i) => (
                <li key={i}>
                  <strong>{exp.title}</strong> at {exp.company} • {exp.years} years
                </li>
              ))}
            </ul>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.skills')}</h2>
            <div className="skills-list">
              <h3>{t('profile.hardSkills')}</h3>
              {isEditing ? (
                <SkillsTagInput
                  value={user.skills || []}
                  onChange={(skills) => updateUser({ skills })}
                  placeholder="Type to add skills (autocomplete)"
                />
              ) : (
                <div className="skill-tags">
                  {(user.skills || []).map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
              <h3>{t('profile.softSkills')}</h3>
              <div className="skill-tags">
                {(user.softSkills || []).map((skill) => (
                  <span key={skill} className="skill-tag soft">{skill}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.education')}</h2>
            <p>{user.education}</p>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.certifications')}</h2>
            <ul>
              {user.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.videoCv')}</h2>
            <div className="video-cv-section">
              {user.videoCvUploaded ? (
                <div className="video-cv-uploaded">
                  <span className="video-icon">✓</span>
                  <p>{t('profile.videoCvUploaded')} {!canUploadVideoCV().unlimited && `(1/${canUploadVideoCV().limit})`}</p>
                  {user.videoCvUrl && (
                    <a href={user.videoCvUrl} target="_blank" rel="noopener noreferrer" className="video-cv-link">
                      {t('profile.viewPlay')}
                    </a>
                  )}
                </div>
              ) : (
                <div className="video-cv-placeholder">
                  <span className="video-icon">🎬</span>
                  <p>{t('profile.uploadMp4StandOut')}</p>
                  {canUploadVideoCV().allowed ? (
                    <UpdateCvButton variant="video-only" />
                  ) : (
                    <p className="video-cv-locked">{t('profile.upgradeForVideo')}</p>
                  )}
                </div>
              )}
            </div>
          </section>

          {user?.role === 'candidate' && (
            <section className="profile-section card">
              <h2>{t('profile.whoViewed')}</h2>
              {canSeeProfileViewers() ? (
                <div className="profile-viewers">
                  {getProfileViewersList().length ? (
                    <ul>
                      {getProfileViewersList().map((v, i) => (
                        <li key={i}>
                          <strong>{v.viewerName || v.company}</strong>
                          {v.company && ` — ${v.company}`}
                          <span className="viewer-time">{new Date(v.viewedAt).toLocaleDateString()}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{t('profile.noProfileViews')}</p>
                  )}
                </div>
              ) : (
                <p className="profile-viewers-locked">{t('profile.upgradeToSeeViewers')}</p>
              )}
            </section>
          )}

          <section className="profile-section card">
            <h2>Portfolio</h2>
            {(user.portfolioProjects || []).length > 0 && (
              <div className="portfolio-projects">
                {user.portfolioProjects.map((p) => (
                  <div key={p.id} className="portfolio-project-item">
                    <h4>{p.title}</h4>
                    <p>{p.description}</p>
                    {p.tech?.length > 0 && (
                      <div className="portfolio-project-tech">
                        {p.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                    )}
                    {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="portfolio-project-link">
                        {t('profile.viewProject')} →
                    </a>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="portfolio-links">
              <h3>{t('profile.links')}</h3>
              {user.linkedIn && (
                <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                  LinkedIn
                </a>
              )}
              {user.portfolio && (
                <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                  Portfolio
                </a>
              )}
              {user.github && (
                <a href={user.github} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                  GitHub
                </a>
              )}
            </div>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.preferences')}</h2>
            <ul className="preferences-list">
              <li>
                <span>{t('profile.salary')}:</span> ${(user.preferences.salaryRange.min / 1000).toFixed(0)}k - $
                {(user.preferences.salaryRange.max / 1000).toFixed(0)}k
              </li>
              <li>
                <span>{t('profile.workType')}:</span> {user.preferences.workType.join(', ')}
              </li>
              <li>
                <span>{t('profile.employment')}:</span> {user.preferences.employmentType}
              </li>
              <li>
                <span>{t('profile.preferredCountries')}:</span> {user.preferences.preferredCountries.join(', ')}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
