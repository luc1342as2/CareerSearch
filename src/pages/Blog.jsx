import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Blog.css';

const POST_IDS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const PLATFORM_IMAGES = {
  '5': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  '6': 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80',
  '7': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  '8': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  '9': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  '10': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
  '11': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  '12': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
};

export default function Blog() {
  const { t } = useLanguage();
  const { id } = useParams();
  const { subscribeToNewsletter, isNewsletterSubscribed } = useApp();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const blogPosts = useMemo(() => {
    return POST_IDS.map((postId) => {
      const post = t(`blog.posts.${postId}`);
      if (typeof post === 'string') return null;
      return {
        id: postId,
        title: post?.title ?? '',
        excerpt: post?.excerpt ?? '',
        category: post?.categoryKey ? t(`blog.${post.categoryKey}`) : '',
        categoryKey: post?.categoryKey,
        date: post?.date ?? '',
        readTime: post?.readTime != null ? `${post.readTime} ${t('blog.minRead')}` : '',
      };
    }).filter(Boolean);
  }, [t]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    if (isNewsletterSubscribed(trimmed)) {
      setStatus('already');
      return;
    }

    const result = subscribeToNewsletter(trimmed);
    if (result.success) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('error');
    }
  };

  const selectedPost = id ? blogPosts.find((p) => p.id === id) : null;
  const postData = selectedPost ? t(`blog.posts.${selectedPost.id}`) : null;
  const hasContent = selectedPost && postData && typeof postData === 'object' && (postData.content || postData.p1);

  if (selectedPost && hasContent) {
    const isPlatformPost = Number(selectedPost.id) >= 5;
    return (
      <main className="blog-page">
        <div className="blog-container blog-post-view">
          <Link to="/blog" className="blog-back">← {t('blog.backToBlog')}</Link>
          <article className="blog-full-post card">
            <div className="blog-post-meta">
              <span className="blog-category">{selectedPost.category}</span>
              <span className="blog-date">{postData.date}</span>
              <span className="blog-read-time">{postData.readTime != null ? `${postData.readTime} ${t('blog.minRead')}` : ''}</span>
            </div>
            <h1>{postData.title}</h1>
            <p className="blog-excerpt">{postData.excerpt}</p>
            {isPlatformPost && postData.p1 ? (
              <div className="blog-full-content">
                <img
                  src={PLATFORM_IMAGES[selectedPost.id]}
                  alt={postData.imageAlt ?? ''}
                  className="blog-post-image"
                />
                <p>{postData.p1}</p>
                <p>{postData.p2}</p>
                <p>{postData.p3}</p>
              </div>
            ) : (
              <div className="blog-full-content">
                <p>{postData.content}</p>
              </div>
            )}
          </article>
        </div>
      </main>
    );
  }

  return (
    <main className="blog-page">
      <div className="blog-container">
        <Link to="/" className="blog-back">← {t('blog.backToHome')}</Link>
        <header className="blog-header">
          <h1>{t('blog.blogNews')}</h1>
          <p>{t('blog.tagline')}</p>
        </header>

        <div className="blog-layout">
          <section className="blog-posts">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                className="blog-post-card card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
              >
                <div className="blog-post-meta">
                  <span className="blog-category">{post.category}</span>
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h2>{post.title}</h2>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="blog-read-more">{t('blog.readMore')}</Link>
              </motion.article>
            ))}
          </section>

          <aside className="blog-sidebar blog-sidebar--center">
            <div className="blog-sidebar-links card">
              <h3>{t('blog.resources')}</h3>
              <Link to="/jobs">{t('blog.browseJobs')}</Link>
              <Link to="/help">{t('blog.helpCenter')}</Link>
              <Link to="/contact">{t('blog.contactUs')}</Link>
            </div>
            <div className="blog-sidebar-links card">
              <h3>{t('blog.platformStandards')}</h3>
              {blogPosts.filter((p) => p.categoryKey === 'categoryPlatformStandards').map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>{post.title}</Link>
              ))}
            </div>
          </aside>

          <aside className="blog-sidebar">
            <div className="newsletter-card card">
              <h3>{t('blog.newsletter')}</h3>
              <p>{t('blog.newsletterDesc')}</p>
              {status === 'success' ? (
                <div className="newsletter-success">
                  <span className="success-icon">✓</span>
                  <p>{t('blog.subscribed')}</p>
                </div>
              ) : status === 'already' ? (
                <div className="newsletter-already">
                  <p>{t('blog.alreadySubscribed')}</p>
                </div>
              ) : status === 'error' ? (
                <div className="newsletter-error">
                  <p>{t('blog.somethingWrong')}</p>
                  <button type="button" className="newsletter-retry" onClick={() => setStatus(null)}>{t('blog.tryAgain')}</button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('blog.enterEmail')}
                    required
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">{t('blog.subscribe')}</button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
