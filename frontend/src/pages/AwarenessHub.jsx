import React from 'react';
import PageLayout from '../components/PageLayout';

const AwarenessHub = () => {
    return (
        <PageLayout 
            title="Phishing Awareness Hub" 
            subtitle="Understand the mechanics of modern social engineering."
        >
            <div style={styles.grid}>
                <div className="glass-panel" style={styles.card}>
                    <h3 style={styles.cardTitle}>Email Phishing</h3>
                    <p style={styles.text}>The most common vector. Attackers forge emails to look like trusted entities (banks, employers, services) to coerce targets into revealing credentials or downloading malicious payloads.</p>
                </div>
                <div className="glass-panel" style={styles.card}>
                    <h3 style={styles.cardTitle}>Spear Phishing</h3>
                    <p style={styles.text}>Highly targeted attacks using personalized context. Attackers research a specific victim—often executives or finance teams—using OSINT to craft an extremely convincing, bespoke scenario.</p>
                </div>
                <div className="glass-panel" style={styles.card}>
                    <h3 style={styles.cardTitle}>Smishing (SMS Phishing)</h3>
                    <p style={styles.text}>Attackers send deceptive text messages. Because people implicitly trust their mobile devices more than email, smishing often achieves higher click-through rates on malicious links.</p>
                </div>
                <div className="glass-panel" style={styles.card}>
                    <h3 style={styles.cardTitle}>Vishing (Voice Phishing)</h3>
                    <p style={styles.text}>Social engineering over the phone. Cybercriminals may use spoofed caller IDs and high-pressure tactics (or even AI voice cloning) to extract sensitive information in real time.</p>
                </div>
            </div>
        </PageLayout>
    );
};

const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
    },
    card: {
        padding: '2rem',
        borderLeft: '4px solid var(--primary-accent)'
    },
    cardTitle: {
        fontSize: '1.4rem',
        color: 'var(--text-light)',
        marginBottom: '1rem'
    },
    text: {
        color: 'var(--text-dim)',
        lineHeight: 1.6
    }
};

export default AwarenessHub;
