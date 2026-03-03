import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Account.css';

export default function Account() {
  const { t } = useLanguage();
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
    { id: 'personal', label: t('account.personalData'), icon: '👤' },
    { id: 'email', label: t('account.emailPreferences'), icon: '✉️' },
    { id: 'security', label: t('account.passwordSecurity'), icon: '🔒' },
    { id: 'privacy', label: t('account.privacyControls'), icon: '🛡️' },
    { id: 'subscription', label: t('account.subscriptionPlan'), icon: '💳' },
    { id: 'danger', label: t('account.deleteAccount'), icon: '⚠️' },
  ];

  return (
    <main className="account-page">
      <div className="account-layout">
        <aside className="account-sidebar">
          <h2>{t('account.settings')}</h2>
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
              <h3>{t('account.personalData')}</h3>
              <p className="section-desc">{t('account.managePersonalInfo')}</p>
              <div className="form-grid">
                <div className="form-group">
                  <label>{t('profile.fullName')}</label>
                  <input type="text" defaultValue={user.fullName} />
                </div>
                <div className="form-group">
                  <label>{t('contact.email')}</label>
                  <input type="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label>{t('profile.phone')}</label>
                  <input type="tel" defaultValue={user.phone} />
                </div>
                <div className="form-group">
                  <label>{t('profile.location')}</label>
                  <input type="text" defaultValue={user.location} />
                </div>
              </div>
              <button className="save-btn">{t('account.saveChanges')}</button>
            </section>
          )}

          {activeSection === 'email' && (
            <section className="account-section card">
              <h3>{t('account.emailPreferences')}</h3>
              <p className="section-desc">{t('account.chooseEmails')}</p>
              <div className="preference-list">
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>{t('account.newMatchingJobs')}</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>{t('account.applicationStatus')}</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>{t('account.recruiterMessages')}</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>{t('account.interviewInvitations')}</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" />
                  <span>{t('account.weeklyDigest')}</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" />
                  <span>{t('account.productUpdates')}</span>
                </label>
              </div>
              <button className="save-btn">{t('account.savePreferences')}</button>
            </section>
          )}

          {activeSection === 'security' && (
            <section className="account-section card">
              <h3>{t('account.passwordSecurity')}</h3>
              <p className="section-desc">{t('account.managePassword')}</p>
              <div className="form-group">
                <label>{t('account.currentPassword')}</label>
                <input type="password" placeholder={t('account.enterCurrentPassword')} />
              </div>
              <div className="form-group">
                <label>{t('account.newPassword')}</label>
                <input type="password" placeholder={t('account.enterNewPassword')} />
              </div>
              <div className="form-group">
                <label>{t('account.confirmNewPassword')}</label>
                <input type="password" placeholder={t('account.confirmNewPasswordPlaceholder')} />
              </div>
              <div className="security-options">
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>{t('account.twoFactor')}</span>
                </label>
                <label className="preference-item">
                  <input type="checkbox" defaultChecked />
                  <span>{t('account.loginNotifications')}</span>
                </label>
              </div>
              <button className="save-btn">{t('account.updatePassword')}</button>
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
              <h3>{t('account.subscriptionPlan')}</h3>
              <p className="section-desc">{t('account.manageSubscription')}</p>
              {user?.role === 'candidate' ? (
                <>
                  <div className={`subscription-card ${isCandidatePremium ? 'premium' : ''}`}>
                    <div className={`plan-badge ${isCandidatePremium ? 'premium' : ''}`}>
                      {isCandidatePremium ? t('account.premium') : t('account.free')}
                    </div>
                    <h4>{isCandidatePremium ? t('account.careerSearchPremium') : t('account.careerSearchFree')}</h4>
                    <p>
                      {isCandidatePremium
                        ? t('account.premiumFeatures')
                        : t('account.freeFeatures')}
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
                          <li>{t('account.upTo5Applications')}</li>
                          <li>{t('account.basicVisibility')}</li>
                          <li>{t('account.emailNotifs')}</li>
                        </>
                      )}
                    </ul>
                    {isCandidatePremium ? (
                      <button className="upgrade-btn secondary" onClick={() => unsubscribeCandidatePremium()}>
                        {t('account.cancelPremium')}
                      </button>
                    ) : (
                      <button className="upgrade-btn" onClick={() => subscribeCandidatePremium()}>
                        {t('account.upgradeToPremium')}
                      </button>
                    )}
                  </div>
                  {!isCandidatePremium && (
                    <div className="plan-comparison">
                      <h4>{t('account.premiumForCandidates')}</h4>
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
                      {isRecruiterSubscribed ? t('account.subscribed') : t('account.free')}
                    </div>
                    <h4>{isRecruiterSubscribed ? t('account.recruiterMonthly') : t('account.recruiterFree')}</h4>
                    <p>
                      {isRecruiterSubscribed
                        ? t('account.recruiterPremiumFeatures')
                        : t('account.limitedAccess')}
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
                          <li>{t('account.upTo10Views')}</li>
                          <li>{t('account.basicPosting')}</li>
                        </>
                      )}
                    </ul>
                    {isRecruiterSubscribed ? (
                      <button className="upgrade-btn secondary" onClick={() => unsubscribeRecruiter()}>
                        {t('account.cancelSubscription')}
                      </button>
                    ) : (
                      <button className="upgrade-btn" onClick={() => subscribeRecruiter()}>
                        {t('account.subscribeRecruiter')}
                      </button>
                    )}
                  </div>
                  {!isRecruiterSubscribed && (
                    <div className="plan-comparison">
                      <h4>{t('account.recruiterFeatures')}</h4>
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
              <h3>{t('account.deleteAccount')}</h3>
              <p className="section-desc">{t('account.deleteDesc')}</p>
              <div className="delete-warning">
                <p>⚠️ {t('account.deleteWarning')}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => setShowDeleteConfirm(true)}
              >
                {t('account.deleteMyAccount')}
              </button>

              {showDeleteConfirm && (
                <div className="delete-modal">
                  <p>{t('account.typeDeleteToConfirm')}</p>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder={t('account.typeDelete')}
                    className="delete-input"
                  />
                  <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }}>
                      {t('common.cancel')}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      disabled={deleteConfirmText !== 'DELETE'}
                      onClick={() => deleteConfirmText === 'DELETE' && alert('Account deletion would be processed. This is a demo.')}
                    >
                      {t('account.deleteAccountBtn')}
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
