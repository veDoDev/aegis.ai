import React from 'react';
import PageLayout from '../components/PageLayout';

const UrlSafety = () => {
    return (
        <PageLayout 
            title="URL Threat Safety Guide" 
            subtitle="Understanding how to dissect and inspect malicious web addresses."
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '3rem'}}>
                <div className="glass-panel" style={styles.panel}>
                    <h3 style={styles.h3}>1. Check Domain Spelling</h3>
                    <p style={styles.p}>Typosquatting is the act of registering domains that look extremely similar to popular brands to trick users. Always look carefully at the characters.</p>
                    <div style={styles.exampleBox}>
                        <div><span style={{color: '#4CAF50'}}>Legitimate:</span> <code>paypal.com</code></div>
                        <div style={{marginTop: '0.5rem'}}><span style={{color: 'var(--secondary-accent)'}}>Malicious:</span> <code>paypa1.com</code></div>
                    </div>
                </div>

                <div className="glass-panel" style={styles.panel}>
                    <h3 style={styles.h3}>2. Look for explicit HTTPS</h3>
                    <p style={styles.p}>While HTTPS does not guarantee a site is safe (attackers can get free SSL certificates), a lack of HTTPS on a banking or login site is an immediate red flag.</p>
                </div>

                <div className="glass-panel" style={styles.panel}>
                    <h3 style={styles.h3}>3. Avoid Blind Shortened Links</h3>
                    <p style={styles.p}>Services like <code>bit.ly</code> or <code>t.co</code> hide the ultimate destination of the URL. Attackers use these to route you through malicious infrastructure without you knowing.</p>
                </div>

                <div className="glass-panel" style={styles.panel}>
                    <h3 style={styles.h3}>4. Hover Before Clicking</h3>
                    <p style={styles.p}>On a desktop, hovering your mouse over a button or link will reveal the actual URL in the bottom-left corner of your browser. Verify it matches where you expect to go.</p>
                </div>
            </div>
        </PageLayout>
    );
};

const styles = {
    panel: {
        padding: '2.5rem',
        borderLeft: '4px solid #00D2FF'
    },
    h3: {
        fontSize: '1.6rem',
        marginBottom: '1rem',
        color: 'var(--text-light)'
    },
    p: {
        color: 'var(--text-dim)',
        lineHeight: 1.6,
        fontSize: '1.05rem'
    },
    exampleBox: {
        marginTop: '1.5rem',
        background: 'rgba(0,0,0,0.5)',
        padding: '1.5rem',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '1.2rem'
    }
};

export default UrlSafety;
