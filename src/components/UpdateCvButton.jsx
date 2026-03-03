import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './UpdateCvButton.css';

export default function UpdateCvButton() {
  const { user, updateUser, isAuthenticated } = useApp();
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

  const handleCvSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast('Please upload a PDF file', 'error');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      updateUser({ cvUploaded: true });
      setUploading(false);
      setShowModal(false);
      showToast('CV uploaded successfully!');
      e.target.value = '';
    }, 800);
  };

  const handleVideoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
    if (!validTypes.includes(file.type)) {
      showToast('Please upload MP4 or WebM video', 'error');
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
      showToast('Please enter a video URL', 'error');
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
      showToast('Video CV link added successfully!');
    }, 800);
  };

  const handleButtonClick = () => {
    setShowModal(true);
    setUploadType(user.cvUploaded ? 'video' : 'cv');
  };

  return (
    <>
      <div className="update-cv-card card">
        <div className="update-cv-content">
          <div className="update-cv-icon">📄</div>
          <div>
            <h3>Update Your Profile</h3>
            <p>
              {user.cvUploaded && !user.videoCvUploaded
                ? 'Add a Video CV to stand out to recruiters'
                : !user.cvUploaded
                ? 'Upload your CV to get better job matches'
                : 'Keep your CV and skills up to date for accurate matching'}
            </p>
          </div>
        </div>
        <button
        className="update-cv-btn"
        onClick={() => !isAuthenticated ? navigate('/login', { state: { from: location } }) : handleButtonClick()}
      >
        {!isAuthenticated ? 'Login to Update CV' : (user.cvUploaded ? 'Update CV / Video CV' : 'Upload CV')}
      </button>
      </div>

      {showModal && (
        <div className="cv-modal-overlay" onClick={() => !uploading && setShowModal(false)}>
          <div className="cv-modal card" onClick={(e) => e.stopPropagation()}>
            <div className="cv-modal-header">
              <h3>Upload Documents</h3>
              <button className="cv-modal-close" onClick={() => !uploading && setShowModal(false)} aria-label="Close">
                ×
              </button>
            </div>
            <div className="cv-modal-tabs">
              <button
                className={`cv-tab ${uploadType === 'cv' ? 'active' : ''}`}
                onClick={() => setUploadType('cv')}
              >
                CV (PDF)
              </button>
              <button
                className={`cv-tab ${uploadType === 'video' ? 'active' : ''}`}
                onClick={() => setUploadType('video')}
              >
                Video CV
              </button>
            </div>
            <div className="cv-modal-content">
              {uploadType === 'cv' ? (
                <div className="cv-upload-section">
                  <p>Upload your CV as a PDF file (max 10MB)</p>
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
                    {uploading ? 'Uploading...' : 'Choose PDF File'}
                  </button>
                </div>
              ) : (
                <div className="cv-upload-section">
                  <p>Upload a video file or paste a link (YouTube, Vimeo, etc.)</p>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime"
                    onChange={handleVideoFileSelect}
                    className="cv-file-input"
                  />
                  <button
                    className="cv-upload-btn"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Choose Video File'}
                  </button>
                  <div className="cv-url-divider">or</div>
                  <div className="cv-url-input-group">
                    <input
                      type="url"
                      placeholder="Paste video URL (e.g. YouTube, Vimeo)"
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
                      Add Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`cv-toast cv-toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
