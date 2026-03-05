import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { extractTextFromPDF, extractSkillsFromText } from '../utils/cvParser';
import './UpdateCvButton.css';

const DEFAULT_SKILLS = ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'HTML', 'CSS'];

export default function UpdateCvButton({ variant = 'full' }) {
  const { user, updateUser, isAuthenticated } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [uploadType, setUploadType] = useState('cv'); // 'cv' | 'video'
  const [videoUrl, setVideoUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState(null);
  const cvInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCvSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast(t('cv.errPdfOnly'), 'error');
      return;
    }
    setUploading(true);
    try {
      const text = await extractTextFromPDF(file);
      const extracted = extractSkillsFromText(text);
      const skills = extracted.length > 0 ? extracted : DEFAULT_SKILLS;
      const existing = new Set((user?.skills || []).map((s) => String(s).trim()));
      const merged = [...existing, ...skills.filter((s) => !existing.has(s))];
      updateUser({ cvUploaded: true, skills: merged });
      setShowModal(false);
      showToast(t('cv.cvUploaded'));
    } catch (err) {
      showToast(t('cv.errPdfOnly') || 'Failed to parse PDF', 'error');
      updateUser({ cvUploaded: true, skills: user?.skills || DEFAULT_SKILLS });
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleVideoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    const validExtensions = ['.mp4', '.webm', '.mov'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
    if (!validTypes.includes(file.type) && !hasValidExt) {
      showToast(t('cv.errVideoFormat'), 'error');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      updateUser({ videoCvUploaded: true, videoCvUrl: URL.createObjectURL(file) });
      setUploading(false);
      setShowModal(false);
      showToast('Video CV uploaded successfully!');
      e.target.value = '';
    }, 800);
  };

  const handleVideoUrlSubmit = () => {
    if (!videoUrl.trim()) {
      showToast(t('cv.errEnterUrl'), 'error');
      return;
    }
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(videoUrl.trim())) {
      showToast('Please enter a valid URL', 'error');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      updateUser({ videoCvUploaded: true, videoCvUrl: videoUrl.trim() });
      setUploading(false);
      setShowModal(false);
      setVideoUrl('');
      showToast(t('cv.videoLinkAdded'));
    }, 800);
  };

  const handleButtonClick = () => {
    setShowModal(true);
    setUploadType(variant === 'video-only' ? 'video' : user.cvUploaded ? 'video' : 'cv');
  };

  const modalContent = (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="cv-modal-overlay"
            onClick={() => !uploading && setShowModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="cv-modal card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
            <div className="cv-modal-header">
              <h3>{t('cv.uploadDocuments')}</h3>
              <button className="cv-modal-close" onClick={() => !uploading && setShowModal(false)} aria-label={t('cv.close')}>
                ×
              </button>
            </div>
            {variant !== 'video-only' && (
            <div className="cv-modal-tabs">
              <button
                className={`cv-tab ${uploadType === 'cv' ? 'active' : ''}`}
                onClick={() => setUploadType('cv')}
              >
                {t('cv.cvPdf')}
              </button>
              <button
                className={`cv-tab ${uploadType === 'video' ? 'active' : ''}`}
                onClick={() => setUploadType('video')}
              >
                {t('cv.videoCvMp4')}
              </button>
            </div>
            )}
            <div className="cv-modal-content">
              {(variant === 'video-only' || uploadType === 'video') ? (
                <div className="cv-upload-section">
                  <p>{t('cv.uploadMp4OrLink')}</p>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,.mp4,video/webm,video/quicktime"
                    onChange={handleVideoFileSelect}
                    className="cv-file-input"
                  />
                  <button
                    className="cv-upload-btn"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? t('cv.uploading') : t('cv.chooseMp4')}
                  </button>
                  <div className="cv-url-divider">{t('cv.or')}</div>
                  <div className="cv-url-input-group">
                    <input
                      type="url"
                      placeholder={t('cv.pasteVideoUrl')}
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="cv-url-input"
                      disabled={uploading}
                    />
                    <button
                      className="cv-url-btn"
                      onClick={handleVideoUrlSubmit}
                      disabled={uploading}
                    >
                      {t('cv.addLink')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="cv-upload-section">
                  <p>{t('cv.uploadPdfMax')}</p>
                  <input
                    ref={cvInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleCvSelect}
                    className="cv-file-input"
                  />
                  <button
                    className="cv-upload-btn"
                    onClick={() => cvInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? t('cv.uploading') : t('cv.choosePdf')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>

      {toast && (
        <div className={`cv-toast cv-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );

  if (variant === 'video-only') {
    return (
      <>
        <button className="upload-video-btn" onClick={() => !isAuthenticated ? navigate('/login', { state: { from: location } }) : handleButtonClick()}>
          Upload Video CV (MP4)
        </button>
        {modalContent}
      </>
    );
  }

  return (
    <>
      <motion.div
        className="update-cv-card card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -2 }}
      >
        <div className="update-cv-content">
          <div className="update-cv-icon">📄</div>
          <div>
            <h3>{t('cv.updateProfile')}</h3>
            <p>
              {user.cvUploaded && !user.videoCvUploaded
                ? t('cv.addVideoCvStandOut')
                : !user.cvUploaded
                ? t('cv.uploadCvBetterMatches')
                : t('cv.keepCvUpdated')}
            </p>
          </div>
        </div>
        <motion.button
          className="update-cv-btn"
          onClick={() => !isAuthenticated ? navigate('/login', { state: { from: location } }) : handleButtonClick()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {!isAuthenticated ? t('cv.loginToUpdateCv') : (user.cvUploaded ? t('cv.updateCvVideoCv') : t('cv.uploadCv'))}
        </motion.button>
      </motion.div>
      {modalContent}
    </>
  );
}
