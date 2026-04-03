import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * A wrapper component to maintain standard page structure:
 * Navbar -> [Content] -> Footer
 */
const PageLayout = ({ children, title, subtitle }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            
            <main style={{ flex: 1, padding: '8rem 4rem 4rem', zIndex: 2, position: 'relative' }}>
                {title && (
                    <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'left' }}>
                        <h1 className="section-title" style={{ fontSize: '3.5rem', background: 'var(--gradient-accent)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {title}
                        </h1>
                        {subtitle && <p className="section-subtitle" style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'var(--text-dim)' }}>{subtitle}</p>}
                    </div>
                )}
                
                {children}
            </main>
            
            <Footer />
        </div>
    );
};

export default PageLayout;
