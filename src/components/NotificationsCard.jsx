import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './NotificationsCard.css';

const NOTIFICATION_CONFIG = {
  new_match: { icon: '🎯', label: 'Job Match', color: 'match' },
  application_update: { icon: '📋', label: 'Application', color: 'update' },
  recruiter_message: { icon: '💬', label: 'Message', color: 'message' },
  interview: { icon: '📅', label: 'Interview', color: 'interview' },
  default: { icon: '🔔', label: 'Notification', color: 'default' },
};

export default function NotificationsCard() {
  const { notifications, markNotificationRead } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayNotifications = notifications.slice(0, 5);

  const getConfig = (type) => NOTIFICATION_CONFIG[type] || NOTIFICATION_CONFIG.default;

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    if (notification.link) {
      navigate(notification.link, {
        state: notification.conversationId ? { openConversation: notification.conversationId } : undefined,
      });
    }
  };

  return (
    <div className="notifications-card card">
      <div className="notifications-card-header">
        <div className="notifications-title-row">
          <h2>{t('notifications.title')}</h2>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </div>
        <Link to="/notifications" className="view-all-link">{t('common.viewAll')}</Link>
      </div>

      <div className="notifications-list">
        {displayNotifications.length === 0 ? (
          <div className="notifications-empty">
            <span className="empty-icon">✓</span>
            <p>{t('notifications.allCaughtUp')}</p>
            <span className="empty-sub">{t('notifications.noNew')}</span>
          </div>
        ) : (
          displayNotifications.map((notification, i) => {
            const config = getConfig(notification.type);
            return (
              <motion.div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''} ${config.color}`}
                onClick={() => handleNotificationClick(notification)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -1 }}
              >
                <span className="notification-icon">{config.icon}</span>
                <div className="notification-content">
                  <p className="notification-title">{notification.title}</p>
                  <p className="notification-message">{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && <span className="unread-dot" />}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
