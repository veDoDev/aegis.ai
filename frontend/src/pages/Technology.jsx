import React from 'react';
import PageLayout from '../components/PageLayout';

const Technology = () => {
    return (
        <PageLayout 
            title="Aegis Core Technology" 
            subtitle="Explore the neural network and sandbox architecture driving our detection engine."
        >
            <div style={{display: 'flex', flexDirection: 'column', gap: '3rem'}}>
                <div className="glass-panel" style={styles.block}>
                    <h2 style={styles.h2}>Machine Learning Detection</h2>
                    <p style={styles.p}>At the heart of Aegis.ai is an ensemble of Deep Learning models continuously trained on millions of active phishing datasets. Instead of relying on static indicator matching, the engine assigns probabilistic risk scores to email signatures, sender reputation metrics, and payload metadata.</p>
                </div>
                
                <div className="glass-panel" style={styles.block}>
                    <h2 style={styles.h2}>Natural Language Processing (NLP)</h2>
                    <p style={styles.p}>Using a finely-tuned BERT architecture, Aegis reads the content of an email just like a human. It performs sentiment extraction to identify subtle emotional manipulation, urgency triggers, and the syntactic fingerprints of Large Language Models (LLMs) used by lazy attackers to generate text.</p>
                </div>
                
                <div className="glass-panel" style={styles.block}>
                    <h2 style={styles.h2}>Heuristic URL Analysis</h2>
                    <p style={styles.p}>Web addresses are stripped to their core components. Aegis analyzes domain registration age, SSL certificate hierarchies, and mathematical distance algorithms (like Levenshtein distance) to detect subtle typo-squatting against fortune 500 banks and brands.</p>
                </div>
                
                <div className="glass-panel" style={styles.block}>
                    <h2 style={styles.h2}>Explainable AI (XAI)</h2>
                    <p style={styles.p}>Security teams cannot rely on a "Black Box". When Aegis blocks an attack, it outputs a human-readable telemetry report detailing exactly which weights triggered the alarm—be it the domain origin, a risky macro, or spoofed DMARC headers. This builds trust and accelerates incident response.</p>
                </div>
                
                <div className="glass-panel" style={styles.block}>
                    <h2 style={styles.h2}>Real-time Threat Monitoring</h2>
                    <p style={styles.p}>Our dynamic sandbox detonates attachments in micro-VMs in real-time. It traces API calls, file system drop attempts, and outbound network beacons to identify malicious payloads that otherwise pass static signature checks.</p>
                </div>
            </div>
        </PageLayout>
    );
};

const styles = {
    block: {
        padding: '3rem',
        borderLeft: '4px solid #7000FF'
    },
    h2: {
        fontSize: '2rem',
        color: 'var(--text-light)',
        marginBottom: '1rem'
    },
    p: {
        color: 'var(--text-dim)',
        lineHeight: 1.8,
        fontSize: '1.05rem'
    }
};

export default Technology;
