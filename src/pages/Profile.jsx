import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { mockCandidateAnalytics } from '../data/mockData';
import { getMatchImprovementSuggestions } from '../services/skillsService';
import UpdateCvButton from '../components/UpdateCvButton';
import SkillsTagInput from '../components/SkillsTagInput';
import './Profile.css';

export default function Profile() {
  const { t } = useLanguage();
  const {
    user,
    updateUser,
    applications,
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
        <header className="profile-page-header">
          <h1 className="profile-page-title">{t('nav.profile')}</h1>
          <p className="profile-page-subtitle">{t('profile.pageSubtitle')}</p>
        </header>

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

          {user?.role === 'candidate' && (() => {
            const suggestions = getMatchImprovementSuggestions(user);
            return suggestions.length > 0 && (
              <div className="improve-suggestions">
                <h3>{t('profile.improveMatch')}</h3>
                <ul>
                  {suggestions.map((suggestion, i) => (
                    <li key={i}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            );
          })()}
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

        {user?.role === 'candidate' && (
          <section className="candidate-stats card">
            <h2 className="candidate-stats-title">{t('profile.yourActivity')}</h2>
            <div className="candidate-stats-grid">
              <div className="candidate-stat">
                <span className="candidate-stat-value">{getProfileViewersList()?.length ?? mockCandidateAnalytics.profileViews}</span>
                <span className="candidate-stat-label">{t('profile.profileViews')}</span>
              </div>
              <div className="candidate-stat">
                <span className="candidate-stat-value">{applications?.length ?? mockCandidateAnalytics.applicationsSent}</span>
                <span className="candidate-stat-label">{t('profile.applicationsSent')}</span>
              </div>
              <div className="candidate-stat">
                <span className="candidate-stat-value">{mockCandidateAnalytics.interviewRate}</span>
                <span className="candidate-stat-label">{t('profile.interviewRate')}</span>
              </div>
            </div>
          </section>
        )}

        <div className="profile-sections">
          <section className="profile-section card">
            <h2>{t('profile.personalInfo')}</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">{t('profile.fullName')}</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.fullName || ''}
                    onChange={(e) => updateUser({ fullName: e.target.value })}
                    className="profile-input"
                    placeholder={t('profile.fullName')}
                  />
                ) : (
                  <span className="value">{user.fullName}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">{t('login.email')}</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={user.email || ''}
                    onChange={(e) => updateUser({ email: e.target.value })}
                    className="profile-input"
                    placeholder="Email"
                  />
                ) : (
                  <span className="value">{user.email}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">{t('profile.phone')}</span>
                {isEditing ? (
                  <input
                    type="tel"
                    value={user.phone || ''}
                    onChange={(e) => updateUser({ phone: e.target.value })}
                    className="profile-input"
                    placeholder="+1 (555) 000-0000"
                  />
                ) : (
                  <span className="value">{user.phone || '—'}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">{t('profile.location')}</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={user.location || ''}
                    onChange={(e) => updateUser({ location: e.target.value })}
                    className="profile-input"
                    placeholder="City, Country"
                  />
                ) : (
                  <span className="value">{user.location}</span>
                )}
              </div>
            </div>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.experience')}</h2>
            {isEditing ? (
              <div className="experience-edit">
                {(user.experience || []).map((exp, i) => (
                  <div key={i} className="experience-edit-block">
                    <div className="experience-edit-item">
                      <input
                        type="text"
                        value={exp.title || ''}
                        onChange={(e) => {
                          const next = [...(user.experience || [])];
                          next[i] = { ...next[i], title: e.target.value };
                          updateUser({ experience: next });
                        }}
                        className="profile-input"
                        placeholder="Job title"
                      />
                      <input
                        type="text"
                        value={exp.company || ''}
                        onChange={(e) => {
                          const next = [...(user.experience || [])];
                          next[i] = { ...next[i], company: e.target.value };
                          updateUser({ experience: next });
                        }}
                        className="profile-input"
                        placeholder="Company"
                      />
                      <input
                        type="number"
                        min="0"
                        value={exp.years ?? ''}
                        onChange={(e) => {
                          const next = [...(user.experience || [])];
                          next[i] = { ...next[i], years: parseInt(e.target.value) || 0 };
                          updateUser({ experience: next });
                        }}
                        className="profile-input profile-input-narrow"
                        placeholder="Yrs"
                      />
                      <button
                        type="button"
                        className="profile-remove-btn"
                        onClick={() => updateUser({ experience: (user.experience || []).filter((_, j) => j !== i) })}
                        aria-label={t('common.remove')}
                      >
                        ×
                      </button>
                    </div>
                    <textarea
                      value={exp.description || ''}
                      onChange={(e) => {
                        const next = [...(user.experience || [])];
                        next[i] = { ...next[i], description: e.target.value };
                        updateUser({ experience: next });
                      }}
                      className="profile-input profile-textarea"
                      placeholder={t('profile.experienceDescription')}
                      rows={3}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="profile-add-btn"
                  onClick={() => updateUser({ experience: [...(user.experience || []), { title: '', company: '', years: 0, description: '' }] })}
                >
                  + {t('profile.addExperience')}
                </button>
              </div>
            ) : (
              <ul className="experience-list">
                {(user.experience || []).map((exp, i) => (
                  <li key={i} className="experience-item">
                    <div className="experience-header">
                      <strong>{exp.title}</strong>
                      <span className="experience-meta">{exp.company} • {exp.years} years</span>
                    </div>
                    {exp.description && (
                      <p className="experience-description">{exp.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="profile-section card">
            <h2>{t('profile.skills')}</h2>
            <div className="skills-list">
              <h3>{t('profile.hardSkills')}</h3>
              {isEditing ? (
                <SkillsTagInput
                  value={user.skills || []}
                  onChange={(skills) => updateUser({ skills })}
                  placeholder={t('skills.addSkill')}
                />
              ) : (
                <div className="skill-tags">
                  {(user.skills || []).map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
              <h3>{t('profile.softSkills')}</h3>
              {isEditing ? (
                <SkillsTagInput
                  value={user.softSkills || []}
                  onChange={(softSkills) => updateUser({ softSkills })}
                  placeholder="Add soft skill..."
                />
              ) : (
                <div className="skill-tags">
                  {(user.softSkills || []).map((skill) => (
                    <span key={skill} className="skill-tag soft">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="profile-section card">
            <h2>{t('profile.education')}</h2>
            {isEditing ? (
              <input
                type="text"
                value={user.education || ''}
                onChange={(e) => updateUser({ education: e.target.value })}
                className="profile-input profile-input-full"
                placeholder="e.g. B.S. Computer Science - University Name"
              />
            ) : (
              <p>{user.education}</p>
            )}
          </section>

          <section className="profile-section card">
            <h2>{t('profile.certifications')}</h2>
            {isEditing ? (
              <div className="certifications-edit">
                <SkillsTagInput
                  value={user.certifications || []}
                  onChange={(certifications) => updateUser({ certifications })}
                  placeholder="Add certification..."
                />
              </div>
            ) : (
              <ul>
                {(user.certifications || []).map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            )}
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
            <h2>{t('profile.portfolio')}</h2>
            {isEditing ? (
              <div className="portfolio-edit">
                <div className="portfolio-links-edit">
                  <div className="portfolio-link-row">
                    <label>{t('profile.linkedIn')}</label>
                    <input
                      type="url"
                      value={user.linkedIn || ''}
                      onChange={(e) => updateUser({ linkedIn: e.target.value })}
                      className="profile-input"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="portfolio-link-row">
                    <label>Portfolio</label>
                    <input
                      type="url"
                      value={user.portfolio || ''}
                      onChange={(e) => updateUser({ portfolio: e.target.value })}
                      className="profile-input"
                      placeholder="https://yoursite.com"
                    />
                  </div>
                  <div className="portfolio-link-row">
                    <label>{t('profile.github')}</label>
                    <input
                      type="url"
                      value={user.github || ''}
                      onChange={(e) => updateUser({ github: e.target.value })}
                      className="profile-input"
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
                <div className="portfolio-projects-edit">
                  <h3>Projects</h3>
                  {(user.portfolioProjects || []).map((p, i) => (
                    <div key={p.id} className="portfolio-project-edit-item">
                      <input
                        type="text"
                        value={p.title || ''}
                        onChange={(e) => {
                          const next = [...(user.portfolioProjects || [])];
                          next[i] = { ...next[i], title: e.target.value };
                          updateUser({ portfolioProjects: next });
                        }}
                        className="profile-input"
                        placeholder={t('profile.projectTitle')}
                      />
                      <input
                        type="text"
                        value={p.description || ''}
                        onChange={(e) => {
                          const next = [...(user.portfolioProjects || [])];
                          next[i] = { ...next[i], description: e.target.value };
                          updateUser({ portfolioProjects: next });
                        }}
                        className="profile-input"
                        placeholder={t('profile.projectDescription')}
                      />
                      <input
                        type="url"
                        value={p.url || ''}
                        onChange={(e) => {
                          const next = [...(user.portfolioProjects || [])];
                          next[i] = { ...next[i], url: e.target.value };
                          updateUser({ portfolioProjects: next });
                        }}
                        className="profile-input"
                        placeholder={t('profile.projectUrl')}
                      />
                      <button
                        type="button"
                        className="profile-remove-btn"
                        onClick={() => updateUser({ portfolioProjects: (user.portfolioProjects || []).filter((_, j) => j !== i) })}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="profile-add-btn"
                    onClick={() => updateUser({ portfolioProjects: [...(user.portfolioProjects || []), { id: `p-${Date.now()}`, title: '', description: '', url: '', tech: [] }] })}
                  >
                    + {t('profile.addProject')}
                  </button>
                </div>
              </div>
            ) : (
              <>
                {(user.portfolioProjects || []).length > 0 && (
                  <div className="portfolio-projects">
                    {user.portfolioProjects.map((p) => (
                      <div key={p.id} className="portfolio-project-item">
                        <h4>{p.title}</h4>
                        <p>{p.description}</p>
                        {p.tech?.length > 0 && (
                          <div className="portfolio-project-tech">
                            {p.tech.map((tech) => (
                              <span key={tech} className="tech-tag">{tech}</span>
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
                      {t('profile.linkedIn')}
                    </a>
                  )}
                  {user.portfolio && (
                    <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                      {t('profile.portfolio')}
                    </a>
                  )}
                  {user.github && (
                    <a href={user.github} target="_blank" rel="noopener noreferrer" className="portfolio-link">
                      {t('profile.github')}
                    </a>
                  )}
                </div>
              </>
            )}
          </section>

          <section className="profile-section card">
            <h2>{t('profile.preferences')}</h2>
            {isEditing ? (
              <div className="preferences-edit">
                <div className="pref-row">
                  <label>{t('profile.salary')} (min $k)</label>
                  <input
                    type="number"
                    value={user.preferences?.salaryRange?.min ? user.preferences.salaryRange.min / 1000 : ''}
                    onChange={(e) => updateUser({
                      preferences: {
                        ...(user.preferences || {}),
                        salaryRange: {
                          ...(user.preferences?.salaryRange || {}),
                          min: (parseInt(e.target.value) || 0) * 1000,
                        },
                      },
                    })}
                    className="profile-input profile-input-narrow"
                    placeholder="120"
                  />
                </div>
                <div className="pref-row">
                  <label>{t('profile.salary')} (max $k)</label>
                  <input
                    type="number"
                    value={user.preferences?.salaryRange?.max ? user.preferences.salaryRange.max / 1000 : ''}
                    onChange={(e) => updateUser({
                      preferences: {
                        ...(user.preferences || {}),
                        salaryRange: {
                          ...(user.preferences?.salaryRange || {}),
                          max: (parseInt(e.target.value) || 0) * 1000,
                        },
                      },
                    })}
                    className="profile-input profile-input-narrow"
                    placeholder="180"
                  />
                </div>
                <div className="pref-row">
                  <label>{t('profile.workType')}</label>
                  <div className="pref-checkboxes">
                    {[
                      { val: 'Remote', key: 'remote' },
                      { val: 'Hybrid', key: 'hybrid' },
                      { val: 'On-site', key: 'onsite' },
                    ].map(({ val, key }) => (
                      <label key={key} className="pref-checkbox">
                        <input
                          type="checkbox"
                          checked={(user.preferences?.workType || []).includes(val)}
                          onChange={(e) => {
                            const current = user.preferences?.workType || [];
                            const next = e.target.checked
                              ? [...current, val]
                              : current.filter((w) => w !== val);
                            updateUser({ preferences: { ...user.preferences, workType: next } });
                          }}
                        />
                        {t(`profile.${key}`)}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="pref-row">
                  <label>{t('profile.employment')}</label>
                  <select
                    value={user.preferences?.employmentType || ''}
                    onChange={(e) => updateUser({ preferences: { ...(user.preferences || {}), employmentType: e.target.value } })}
                    className="profile-input"
                  >
                    <option value="">{t('profile.select')}</option>
                    <option value="Full-time">{t('profile.fullTime')}</option>
                    <option value="Part-time">{t('profile.partTime')}</option>
                    <option value="Contract">{t('profile.contract')}</option>
                    <option value="Freelance">{t('profile.freelance')}</option>
                  </select>
                </div>
                <div className="pref-row">
                  <label>{t('profile.preferredCountries')}</label>
                  <input
                    type="text"
                    value={(user.preferences?.preferredCountries || []).join(', ')}
                    onChange={(e) => updateUser({
                      preferences: {
                        ...(user.preferences || {}),
                        preferredCountries: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      },
                    })}
                    className="profile-input"
                    placeholder="USA, Canada, UK"
                  />
                </div>
              </div>
            ) : (
              <ul className="preferences-list">
                <li>
                  <span>{t('profile.salary')}:</span> ${((user.preferences?.salaryRange?.min || 0) / 1000).toFixed(0)}k - $
                  {((user.preferences?.salaryRange?.max || 0) / 1000).toFixed(0)}k
                </li>
                <li>
                  <span>{t('profile.workType')}:</span> {(user.preferences?.workType || []).join(', ') || '—'}
                </li>
                <li>
                  <span>{t('profile.employment')}:</span> {user.preferences?.employmentType || '—'}
                </li>
                <li>
                  <span>{t('profile.preferredCountries')}:</span> {(user.preferences?.preferredCountries || []).join(', ') || '—'}
                </li>
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
