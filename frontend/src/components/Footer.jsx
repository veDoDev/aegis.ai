import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.grid}>
                <div style={styles.brandCol}>
                    <h3 style={styles.brandName}>Aegis.ai</h3>
                    <p style={styles.brandDesc}>
                        Securing the future of digital communication with adaptive, explainable, and multi-vector threat prevention solutions.
                    </p>
                </div>
                <div style={styles.linksCol}>
                    <h4 style={styles.colHeader}>Platform</h4>
                    <ul style={styles.list}>
                        <li><a href="#how-it-works" style={styles.link}>Pipeline Architecture</a></li>
                        <li><a href="#capabilities" style={styles.link}>Threat Intelligence</a></li>
                        <li><a href="#" style={styles.link}>Live Test Engine</a></li>
                        <li><a href="#" style={styles.link}>Enterprise Sandbox</a></li>
                    </ul>
                </div>
                <div style={styles.linksCol}>
                    <h4 style={styles.colHeader}>Resources</h4>
                    <ul style={styles.list}>
                        <li><a href="#" style={styles.link}>API Documentation</a></li>
                        <li><a href="#" style={styles.link}>Integration Guides</a></li>
                        <li><a href="#" style={styles.link}>Case Studies</a></li>
                        <li><a href="#" style={styles.link}>Threat Metrics Hub</a></li>
                    </ul>
                </div>
                <div style={styles.linksCol}>
                    <h4 style={styles.colHeader}>Company</h4>
                    <ul style={styles.list}>
                        <li><a href="#" style={styles.link}>About Us</a></li>
                        <li><a href="#" style={styles.link}>Security Research</a></li>
                        <li><a href="#" style={styles.link}>Careers</a></li>
                        <li><a href="#" style={styles.link}>Contact SOC</a></li>
                    </ul>
                </div>
            </div>
            <div style={styles.bottomBar}>
                <p>&copy; 2026 Aegis.ai Security Architecture. All rights reserved.</p>
                <div style={styles.socials}>
                    <a href="#" style={styles.socialLink}>Twitter</a>
                    <a href="#" style={styles.socialLink}>LinkedIn</a>
                    <a href="#" style={styles.socialLink}>GitHub</a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: 'rgba(5, 8, 15, 0.95)',
        borderTop: '1px solid var(--glass-border)',
        padding: '6rem 4rem 2rem',
        position: 'relative',
        zIndex: 10
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '4rem',
        marginBottom: '4rem'
    },
    brandCol: {
        display: 'flex',
        flexDirection: 'column'
    },
    brandName: {
        color: 'var(--primary-accent)',
        fontSize: '2.2rem',
        marginBottom: '1rem',
        fontFamily: 'Orbitron, sans-serif'
    },
    brandDesc: {
        color: 'var(--text-dim)',
        fontSize: '0.95rem',
        maxWidth: '320px',
        lineHeight: 1.8
    },
    linksCol: {
        display: 'flex',
        flexDirection: 'column'
    },
    colHeader: {
        color: 'var(--text-light)',
        marginBottom: '1.5rem',
        fontSize: '1.1rem'
    },
    list: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    link: {
        color: 'var(--text-dim)',
        fontSize: '0.95rem',
        transition: 'color 0.3s'
    },
    bottomBar: {
        textAlign: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: '0.9rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    socials: {
        display: 'flex',
        gap: '1.5rem'
    },
    socialLink: {
        color: 'rgba(255, 255, 255, 0.4)',
        transition: 'color 0.3s'
    }
};

// Quick hover effect inject
const injectedHover = `
    .linksCol ul li a:hover { color: var(--secondary-accent) !important; }
    .socials a:hover { color: var(--primary-accent) !important; }
`;
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = injectedHover;
    document.head.appendChild(styleSheet);
}

export default Footer;
