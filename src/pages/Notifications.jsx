import { useApp } from '../context/AppContext';
import './Notifications.css';

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_match': return '🎯';
      case 'application_update': return '📋';
      case 'recruiter_message': return '💬';
      default: return '🔔';
    }
  };

  return (
    <main className="notifications-page">
      <div className="notifications-container">
        <h1>Notifications</h1>
        <div className="notifications-list-full">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card card ${!notification.read ? 'unread' : ''}`}
              onClick={() => markNotificationRead(notification.id)}
            >
              <span className="notification-icon">{getNotificationIcon(notification.type)}</span>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
