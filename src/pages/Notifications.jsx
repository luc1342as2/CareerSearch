import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Notifications.css';

export default function Notifications() {
  const { notifications, markNotificationRead } = useApp();
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    markNotificationRead(notification.id);
    if (notification.link) {
      navigate(notification.link, {
        state: notification.conversationId ? { openConversation: notification.conversationId } : undefined,
      });
    }
  };

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
              onClick={() => handleNotificationClick(notification)}
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
