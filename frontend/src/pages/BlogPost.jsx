import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import { blogData } from '../data/blogData';
import { ArrowLeft } from 'lucide-react';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogData.find(b => b.id === id);

    if (!post) {
        return (
            <PageLayout title="Report Not Found">
                <p>The requested threat intelligence report does not exist.</p>
                <Link to="/blog" className="btn btn-primary">Return to Blog</Link>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div style={styles.articleContainer}>
                <Link to="/blog" style={styles.backLink}>
                    <ArrowLeft size={20} /> Back to Threat Intel
                </Link>
                
                <div style={styles.date}>{post.date}</div>
                
                {/* 
                  To safely render markdown-ish text easily without adding a markdown compiler library right now,
                  we split the content by newlines and render headers and paragraphs conditionally. 
                */}
                <div style={styles.contentBody}>
                    {post.content.split('\n').map((line, idx) => {
                        if (line.trim().startsWith('# ')) {
                            return <h1 key={idx} style={{...styles.baseLine, fontSize: '3rem', color: 'var(--primary-accent)', marginBottom: '2rem'}}>{line.replace('# ', '')}</h1>;
                        }
                        if (line.trim().startsWith('### ')) {
                            return <h3 key={idx} style={{...styles.baseLine, fontSize: '1.8rem', color: 'var(--text-light)', marginTop: '2.5rem', marginBottom: '1rem'}}>{line.replace('### ', '')}</h3>;
                        }
                        if (line.trim().startsWith('- ') || line.trim().match(/^[0-9]\./)) {
                            return <li key={idx} style={{...styles.baseLine, ...styles.listItem}}>{line.replace(/^(- |[0-9]\. )/, '')}</li>;
                        }
                        if (line.trim() === '') return <br key={idx} />;
                        
                        // Parse simple bold tags dynamically
                        if (line.includes('**')) {
                            const parts = line.split('**');
                            return (
                                <p key={idx} style={{...styles.baseLine, ...styles.paragraph}}>
                                    {parts.map((p, i) => i % 2 !== 0 ? <strong key={i} style={{color: 'var(--text-light)'}}>{p}</strong> : p)}
                                </p>
                            );
                        }

                        return <p key={idx} style={{...styles.baseLine, ...styles.paragraph}}>{line}</p>;
                    })}
                </div>
            </div>
        </PageLayout>
    );
};

const styles = {
    articleContainer: {
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem'
    },
    backLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--primary-accent)',
        textDecoration: 'none',
        marginBottom: '3rem',
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    date: {
        color: 'var(--secondary-accent)',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '2rem'
    },
    contentBody: {
        color: 'var(--text-dim)',
        lineHeight: 1.8,
        fontSize: '1.1rem'
    },
    baseLine: {
        boxSizing: 'border-box'
    },
    paragraph: {
        marginBottom: '1.2rem'
    },
    listItem: {
        marginLeft: '2rem',
        marginBottom: '0.8rem',
        listStyleType: 'disc'
    }
};

export default BlogPost;
