import { useParams, Link } from 'react-router-dom';
import './Placeholder.css';

const pageTitles = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  help: 'Help Center',
  contact: 'Contact Us',
};

export default function Placeholder() {
  const { page } = useParams();
  const title = pageTitles[page] || 'Page';

  return (
    <main className="placeholder-page">
      <h1>{title}</h1>
      <p>This page is coming soon.</p>
      <Link to="/" className="back-link">← Back to Home</Link>
    </main>
  );
}
