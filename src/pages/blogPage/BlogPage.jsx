import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ARTICLES_API_BASE } from '../../config/api';
import './blog.scss';

const OilDropIcon = () => (
    <svg viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 2C24 2 4 24 4 36C4 47.05 13.07 56 24 56C34.93 56 44 47.05 44 36C44 24 24 2 24 2Z" fill="#CC0000" />
        <path d="M31 33C31 37.42 27.87 41 24 41" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const ArrowRight = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

function ArticleCard({ article, featured, onClick }) {
    const excerpt = article.description || article.excerpt || '';
    return (
        <div
            className={`blog-page__card fade-up ${featured ? 'blog-page__card--featured' : ''}`}
            onClick={() => onClick(article.slug)}
            role="article"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(article.slug)}
        >
            {article.image ? (
                <img src={article.image} alt={article.title} className="blog-page__card-image" loading="lazy" />
            ) : (
                <div className="blog-page__card-image-placeholder">
                    <OilDropIcon />
                </div>
            )}
            <div className="blog-page__card-meta">
                <span className="blog-page__card-category">{article.category || 'Статья'}</span>
                {article.read_time && <span className="blog-page__card-readtime">{article.read_time}</span>}
            </div>
            <h2 className="blog-page__card-title">{article.title}</h2>
            {excerpt && <p className="blog-page__card-excerpt">{excerpt}</p>}
            <div className="blog-page__card-footer">
                <span className="blog-page__card-link">
                    Читать <span className="blog-page__card-arrow"><ArrowRight /></span>
                </span>
            </div>
        </div>
    );
}

export default function BlogPage() {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const lang = i18n.language === 'en' ? 'en' : 'ru';
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${ARTICLES_API_BASE}/articles?lang=${lang}`, { signal: controller.signal });
                if (!res.ok) throw new Error(`Ошибка ${res.status}`);
                const data = await res.json();
                setArticles(data);
            } catch (err) {
                if (err.name !== 'AbortError') setError('Не удалось загрузить статьи.');
            } finally {
                setLoading(false);
            }
        }
        load();
        return () => controller.abort();
    }, [lang]);

    const go = (slug) => navigate(`/blog/${slug}`);

    return (
        <main className="blog-page">
            <section className="blog-page__hero">
                <div className="blog-page__hero-eyebrow">Valesco Oil — База знаний</div>
                <h1 className="blog-page__hero-title">Масла и технические жидкости</h1>
                <p className="blog-page__hero-subtitle">
                    Экспертные статьи о моторных маслах, вязкости и выборе технических жидкостей.
                </p>
            </section>

            <div className="blog-page__articles container">
                {loading && (
                    <div className="blog-page__loading">
                        <div className="blog-page__spinner" />
                        Загрузка статей...
                    </div>
                )}
                {!loading && error && <div className="blog-page__empty">{error}</div>}
                {!loading && !error && articles.length === 0 && (
                    <div className="blog-page__empty">Статей пока нет</div>
                )}
                {!loading && !error && articles.length > 0 && (
                    <>
                        <div className="blog-page__featured">
                            {articles.slice(0, 2).map((a) => (
                                <ArticleCard key={a.id} article={a} featured onClick={go} />
                            ))}
                        </div>
                        {articles.length > 2 && (
                            <div className="blog-page__list">
                                {articles.slice(2).map((a) => (
                                    <ArticleCard key={a.id} article={a} onClick={go} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
