import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Profile.css';

export default function Profile() {
  const { user } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="profile-header card">
          <div className="profile-header-top">
            <div className="profile-completion">
              <div className="completion-label">
                <span>Profile completion</span>
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
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {user.matchImprovementSuggestions?.length > 0 && (
            <div className="improve-suggestions">
              <h3>Improve your match score</h3>
              <ul>
                {user.matchImprovementSuggestions.map((suggestion, i) => (
                  <li key={i}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="profile-sections">
          <section className="profile-section card">
            <h2>Personal Info</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">Full Name</span>
                <span className="value">{user.fullName}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Phone</span>
                <span className="value">{user.phone || '—'}</span>
              </div>
              <div className="info-item">
                <span className="label">Location</span>
                <span className="value">{user.location}</span>
              </div>
            </div>
          </section>

          <section className="profile-section card">
            <h2>Experience</h2>
            <ul className="experience-list">
              {user.experience.map((exp, i) => (
                <li key={i}>
                  <strong>{exp.title}</strong> at {exp.company} • {exp.years} years
                </li>
              ))}
            </ul>
          </section>

          <section className="profile-section card">
            <h2>Skills</h2>
            <div className="skills-list">
              <h3>Hard Skills</h3>
              <div className="skill-tags">
                {user.skills.map((skill) => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
              <h3>Soft Skills</h3>
              <div className="skill-tags">
                {user.softSkills.map((skill) => (
                  <span key={skill} className="skill-tag soft">{skill}</span>
                ))}
              </div>
            </div>
          </section>

          <section className="profile-section card">
            <h2>Education</h2>
            <p>{user.education}</p>
          </section>

          <section className="profile-section card">
            <h2>Certifications</h2>
            <ul>
              {user.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </section>

          <section className="profile-section card">
            <h2>Video CV</h2>
            <div className="video-cv-section">
              {user.videoCvUploaded ? (
                <div className="video-cv-uploaded">
                  <span className="video-icon">✓</span>
                  <p>Video CV uploaded</p>
                </div>
              ) : (
                <div className="video-cv-placeholder">
                  <span className="video-icon">🎬</span>
                  <p>No video CV yet</p>
                  <button className="upload-video-btn">Upload Video CV</button>
                </div>
              )}
            </div>
          </section>

          <section className="profile-section card">
            <h2>Portfolio Links</h2>
            <div className="portfolio-links">
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
            <h2>Preferences</h2>
            <ul className="preferences-list">
              <li>
                <span>Salary:</span> ${(user.preferences.salaryRange.min / 1000).toFixed(0)}k - $
                {(user.preferences.salaryRange.max / 1000).toFixed(0)}k
              </li>
              <li>
                <span>Work Type:</span> {user.preferences.workType.join(', ')}
              </li>
              <li>
                <span>Employment:</span> {user.preferences.employmentType}
              </li>
              <li>
                <span>Preferred Countries:</span> {user.preferences.preferredCountries.join(', ')}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
