import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Account.css';

export default function Account() {
  const {
    user,
    isCandidatePremium,
    isRecruiterSubscribed,
    subscribeCandidatePremium,
    unsubscribeCandidatePremium,
    subscribeRecruiter,
    unsubscribeRecruiter,
  } = useApp();
  const [activeSection, setActiveSection] = useState('personal');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const sections = [
    { id: 'personal', label: 'Personal Data', icon: '👤' },
    { id: 'email', label: 'Email Preferences', icon: '✉️' },
    { id: 'security', label: 'Password & Security', icon: '🔒' },
    { id: 'privacy', label: 'Privacy Controls', icon: '🛡️' },
    { id: 'subscription', label: 'Subscription Plan', icon: '💳' },
    { id: 'danger', label: 'Delete Account', icon: '⚠️' },
  ];

  return (
    <main className="account-page">
      <div className="account-layout">
        <aside className="account-sidebar">
          <h2>Settings</h2>
          <nav className="account-nav">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                <span className="nav-icon">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="account-content">
          {activeSection === 'personal' && (
            <section className="account-section card">
              <h3>Personal Data</h3>
              <p className="section-desc">Manage your personal information</p>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={user.fullName} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" defaultValue={user.phone} />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" defaultValue={user.location} />
                </div>
              </div>
              <button className="save-btn">Save Changes</button>
            </section>
          )}

          {activeSection === 'email' && (
            <section className="account-section card">
              <h3>Email Preferences</h3>
              <p className="section-desc">Choose what emails you receive</p>
              <div className="preference-list">
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>New matching jobs</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Application status updates</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Recruiter messages</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Interview invitations</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" />
                  <span>Weekly job digest</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" />
                  <span>Product updates & tips</span>
                </label>
              </div>
              <button className="save-btn">Save Preferences</button>
            </section>
          )}

          {activeSection === 'security' && (
            <section className="account-section card">
              <h3>Password & Security</h3>
              <p className="section-desc">Manage your password and security settings</p>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="Confirm new password" />
              </div>
              <div className="security-options">
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Two-factor authentication</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Login notifications</span>
                </label>
              </div>
              <button className="save-btn">Update Password</button>
            </section>
          )}

          {activeSection === 'privacy' && (
            <section className="account-section card">
              <h3>Privacy Controls</h3>
              <p className="section-desc">Control who can see your profile</p>
              <div className="privacy-options">
                <label className="radio-option">
                  <input type="radio" name="visibility" value="public" defaultChecked={user.profileVisibility === 'public'} />
                  <div>
                    <strong>Public</strong>
                    <span>Your profile is visible to all recruiters</span>
                  </div>
                </label>
                <label className="radio-option">
                  <input type="radio" name="visibility" value="private" defaultChecked={user.profileVisibility === 'private'} />
                  <div>
                    <strong>Private</strong>
                    <span>Only visible when you apply to jobs</span>
                  </div>
                </label>
              </div>
              <div className="preference-list">
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Show profile in search results</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>Allow recruiters to contact me</span>
                </label>
              </div>
              <button className="save-btn">Save Privacy Settings</button>
            </section>
          )}

          {activeSection === 'subscription' && (
            <section className="account-section card">
              <h3>Subscription Plan</h3>
              <p className="section-desc">Manage your subscription</p>
              {user?.role === 'candidate' ? (
                <>
                  <div className={`subscription-card ${isCandidatePremium ? 'premium' : ''}`}>
                    <div className={`plan-badge ${isCandidatePremium ? 'premium' : ''}`}>
                      {isCandidatePremium ? 'Premium' : 'Free'}
                    </div>
                    <h4>{isCandidatePremium ? 'CareerSearch Premium' : 'CareerSearch Free'}</h4>
                    <p>
                      {isCandidatePremium
                        ? 'Advanced AI insights, unlimited video CV, profile viewers, profile boost'
                        : 'Basic job matching and profile visibility'}
                    </p>
                    <ul>
                      {isCandidatePremium ? (
                        <>
                          <li>Advanced AI insights</li>
                          <li>Unlimited video CV</li>
                          <li>See who viewed your profile</li>
                          <li>Profile boost</li>
                        </>
                      ) : (
                        <>
                          <li>Up to 5 job applications per month</li>
                          <li>Basic profile visibility</li>
                          <li>Email notifications</li>
                        </>
                      )}
                    </ul>
                    {isCandidatePremium ? (
                      <button className="upgrade-btn secondary" onClick={() => unsubscribeCandidatePremium()}>
                        Cancel Premium
                      </button>
                    ) : (
                      <button className="upgrade-btn" onClick={() => subscribeCandidatePremium()}>
                        Upgrade to Premium
                      </button>
                    )}
                  </div>
                  {!isCandidatePremium && (
                    <div className="plan-comparison">
                      <h4>Premium — For Candidates</h4>
                      <ul>
                        <li>Advanced AI insights</li>
                        <li>Unlimited video CV</li>
                        <li>See who viewed your profile</li>
                        <li>Profile boost</li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className={`subscription-card ${isRecruiterSubscribed ? 'premium' : ''}`}>
                    <div className={`plan-badge ${isRecruiterSubscribed ? 'premium' : ''}`}>
                      {isRecruiterSubscribed ? 'Subscribed' : 'Free'}
                    </div>
                    <h4>{isRecruiterSubscribed ? 'Recruiter Monthly' : 'Recruiter Free'}</h4>
                    <p>
                      {isRecruiterSubscribed
                        ? 'AI filtering, unlimited candidate access, featured job posts'
                        : 'Limited candidate access'}
                    </p>
                    <ul>
                      {isRecruiterSubscribed ? (
                        <>
                          <li>AI filtering tools</li>
                          <li>Unlimited candidate access</li>
                          <li>Featured job posts</li>
                          <li>Priority support</li>
                        </>
                      ) : (
                        <>
                          <li>Up to 10 candidate views per job</li>
                          <li>Basic job posting</li>
                        </>
                      )}
                    </ul>
                    {isRecruiterSubscribed ? (
                      <button className="upgrade-btn secondary" onClick={() => unsubscribeRecruiter()}>
                        Cancel Subscription
                      </button>
                    ) : (
                      <button className="upgrade-btn" onClick={() => subscribeRecruiter()}>
                        Subscribe — Recruiter Monthly
                      </button>
                    )}
                  </div>
                  {!isRecruiterSubscribed && (
                    <div className="plan-comparison">
                      <h4>Recruiter Monthly — Features</h4>
                      <ul>
                        <li>AI filtering tools</li>
                        <li>Unlimited candidate access</li>
                        <li>Featured job posts</li>
                        <li>Priority support</li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {activeSection === 'danger' && (
            <section className="account-section card danger-zone">
              <h3>Delete Account</h3>
              <p className="section-desc">Permanently delete your account and all associated data. This action cannot be undone.</p>
              <div className="delete-warning">
                <p>⚠️ You will lose access to your profile, applications, and messages.</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete My Account
              </button>

              {showDeleteConfirm && (
                <div className="delete-modal">
                  <p>Type <strong>DELETE</strong> to confirm:</p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE"
                    className="delete-input"
                  />
                  <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}>
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      disabled={deleteConfirmText !== 'DELETE'}
                      onClick={() => deleteConfirmText === 'DELETE' && alert('Account deletion would be processed. This is a demo.')}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
