import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ARTICLES_API_BASE } from '../../config/api';
import './blog.scss';

const OilDropIcon = () => (
    <svg viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 2C24 2 4 24 4 36C4 47.05 13.07 56 24 56C34.93 56 44 47.05 44 36C44 24 24 2 24 2Z" fill="#B8922A" />
        <path d="M31 33C31 37.42 27.87 41 24 41" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ArrowLeft = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M12 7H2M6 3L2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IconCopy = () => (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 8.5H1.5A.5.5 0 011 8V1.5A.5.5 0 011.5 1H8a.5.5 0 01.5.5V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

function updateMetaTags({ title, description, slug }) {
    document.title = title ? `${title} | Valesco Oil` : 'Valesco Oil Blog';

    const setMeta = (selector, attr, value) => {
        let el = document.querySelector(selector);
        if (!el) {
            el = document.createElement('meta');
            const [attrName, attrVal] = attr.split('=');
            el.setAttribute(attrName, attrVal);
            document.head.appendChild(el);
        }
        el.setAttribute('content', value || '');
    };

    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[property="og:url"]', 'property=og:url', `${window.location.origin}/blog/${slug}`);
}

function RelatedCard({ article, onClick }) {
    return (
        <div
            className="article-page__related-card"
            onClick={() => onClick(article.slug)}
            role="article"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(article.slug)}
        >
            <div className="article-page__related-card-category">{article.category || 'Статья'}</div>
            <div className="article-page__related-card-title">{article.title}</div>
            {article.read_time && (
                <div className="article-page__related-card-readtime">{article.read_time}</div>
            )}
        </div>
    );
}

export default function ArticlePage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const lang = i18n.language === 'en' ? 'en' : 'ru';

    const [article, setArticle] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function loadArticle() {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`${ARTICLES_API_BASE}/articles/${slug}?lang=${lang}`, { signal: controller.signal });
                if (res.status === 404) throw new Error('not_found');
                if (!res.ok) throw new Error(`Ошибка ${res.status}`);
                const data = await res.json();
                setArticle(data);

                updateMetaTags({
                    title: data.metaTitle || data.title,
                    description: data.metaDescription || data.description || data.excerpt || '',
                    slug,
                });

                try {
                    const allRes = await fetch(`${ARTICLES_API_BASE}/articles?lang=${lang}`, { signal: controller.signal });
                    if (allRes.ok) {
                        const allData = await allRes.json();
                        setRelated(allData.filter((a) => a.slug !== slug).slice(0, 3));
                    }
                } catch (_) { }

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message === 'not_found' ? 'not_found' : 'error');
                }
            } finally {
                setLoading(false);
            }
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
        loadArticle();

        return () => {
            controller.abort();
            document.title = 'Valesco Oil';
        };
    }, [slug, lang]);

    const handleBack = () => navigate('/blog');

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (_) { }
    };

    if (loading) {
        return (
            <main className="article-page">
                <div className="blog-page__loading" aria-live="polite">
                    <div className="blog-page__spinner" aria-hidden="true" />
                    Загрузка статьи...
                </div>
            </main>
        );
    }

    if (error === 'not_found') {
        return (
            <main className="article-page">
                <div style={{ textAlign: 'center', padding: '80px 24px' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', color: '#B8922A', marginBottom: '16px' }}>404</div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#7A7870', marginBottom: '24px' }}>Статья не найдена</p>
                    <button className="article-page__back" onClick={handleBack}><ArrowLeft /> Все статьи</button>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="article-page">
                <div style={{ textAlign: 'center', padding: '80px 24px', fontFamily: "'DM Sans', sans-serif", color: '#7A7870' }}>
                    Не удалось загрузить статью. Попробуйте позже.
                </div>
            </main>
        );
    }

    if (!article) return null;

    const excerpt = article.description || article.excerpt || '';
    const bodyContent = article.content || '';

    return (
        <main className="article-page container">
            <div className="article-page__nav">
                <button className="article-page__back" onClick={handleBack} aria-label="Вернуться к списку статей">
                    <ArrowLeft /> Все статьи
                </button>
            </div>

            <header className="article-page__header">
                <div className="article-page__meta">
                    {article.category && <span className="article-page__category">{article.category}</span>}
                    {article.read_time && <span className="article-page__readtime">{article.read_time} чтения</span>}
                </div>
                <h1 className="article-page__title">{article.title}</h1>
                {excerpt && <p className="article-page__lead">{excerpt}</p>}
            </header>

            <div className="article-page__cover">
                {article.image ? (
                    <img src={article.image} alt={article.title} />
                ) : (
                    <div className="article-page__cover-placeholder">
                        <OilDropIcon />
                    </div>
                )}
            </div>

            {bodyContent ? (
                <article
                    className="article-page__body"
                    dangerouslySetInnerHTML={{ __html: bodyContent }}
                    aria-label={`Статья: ${article.title}`}
                />
            ) : (
                <div className="article-page__body" style={{ color: '#B8B5AD', fontStyle: 'italic' }}>
                    Содержимое статьи загружается...
                </div>
            )}

            <div className="article-page__footer">
                <span className="article-page__footer-label">Поделиться</span>
                <div className="article-page__share-btns">
                    <button className="article-page__share-btn" onClick={handleCopyLink} aria-label="Скопировать ссылку">
                        <IconCopy /> {copied ? 'Скопировано!' : 'Ссылка'}
                    </button>
                </div>
            </div>

            {related.length > 0 && (
                <section className="article-page__related" aria-labelledby="related-heading">
                    <h2 className="article-page__related-title" id="related-heading">Читайте также</h2>
                    <div className="article-page__related-grid">
                        {related.map((a) => (
                            <RelatedCard key={a.id} article={a} onClick={(s) => navigate(`/blog/${s}`)} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
