import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, currentUser, logout } = useApp();
  const navigate = useNavigate();
  const isRecruiter = currentUser?.role === 'recruiter';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">💼</span>
          <span className="logo-text">CareerSearch</span>
        </NavLink>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/jobs" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Jobs
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/messages" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Messages
            </NavLink>
          </li>
          {isRecruiter && (
            <li>
              <NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Recruiter
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/pricing" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Account
            </NavLink>
          </li>
          {isAuthenticated ? (
            <li>
              <button className="nav-link nav-logout" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/signup" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
