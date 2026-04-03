import React from 'react';
import PageLayout from '../components/PageLayout';
import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';

const ThreatBlog = () => {
    return (
        <PageLayout 
            title="Threat Intelligence Blog" 
            subtitle="Late-breaking research and strategic defense insights from the Aegis SOC team."
        >
            <div style={styles.grid}>
                {blogData.map((article) => (
                    <div key={article.id} className="glass-panel" style={styles.card}>
                        <div style={styles.date}>{article.date}</div>
                        <h3 style={styles.title}>{article.title}</h3>
                        <p style={styles.excerpt}>{article.excerpt}</p>
                        
                        <Link to={`/blog/${article.id}`} style={styles.readMore}>
                            Read Full Report →
                        </Link>
                    </div>
                ))}
            </div>
        </PageLayout>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2.5rem'
    },
    card: {
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column'
    },
    date: {
        color: 'var(--primary-accent)',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '1rem',
        letterSpacing: '1px',
        textTransform: 'uppercase'
    },
    title: {
        fontSize: '1.6rem',
        color: 'var(--text-light)',
        marginBottom: '1rem'
    },
    excerpt: {
        color: 'var(--text-dim)',
        lineHeight: 1.6,
        marginBottom: '2rem',
        flex: 1
    },
    readMore: {
        color: '#7000FF',
        fontWeight: 700,
        fontSize: '1.1rem',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'color 0.3s'
    }
};

export default ThreatBlog;
