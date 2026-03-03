import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './NotificationsCard.css';

export default function NotificationsCard() {
  const { notifications, markNotificationRead } = useApp();
  const displayNotifications = notifications.slice(0, 5);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_match': return '🎯';
      case 'application_update': return '📋';
      case 'recruiter_message': return '💬';
      default: return '🔔';
    }
  };

  return (
    <div className="notifications-card card">
      <div className="card-header">
        <h2>🔔 New Notifications</h2>
        <Link to="/notifications" className="view-all-link">View All</Link>
      </div>
      <div className="notifications-list">
        {displayNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${!notification.read ? 'unread' : ''}`}
            onClick={() => markNotificationRead(notification.id)}
          >
            <span className="notification-icon">{getNotificationIcon(notification.type)}</span>
            <div className="notification-content">
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
