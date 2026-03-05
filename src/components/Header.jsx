import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ unreadTotal, currentUser }) {
  return (
    <header className="header">
      <Link to="/" className="logo">CareerSearch</Link>
      <nav className="nav">
        <Link to="/jobs">Jobs</Link>
        <Link to="/messages" className="nav-messages">
          Messages
          {unreadTotal > 0 && (
            <span className="notification-badge" title={`${unreadTotal} unread`}>
              {unreadTotal > 99 ? '99+' : unreadTotal}
            </span>
          )}
        </Link>
      </nav>
      {currentUser && (
        <div className="user-info">
          <img src={currentUser.avatar} alt="" className="avatar" />
          <span className="user-name">{currentUser.name}</span>
        </div>
      )}
    </header>
  );
}
