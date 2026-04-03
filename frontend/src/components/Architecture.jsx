import React from 'react';

const Architecture = () => {
    const steps = [
        { id: "01", title: "Content Ingestion", desc: "Incoming data is aggressively parsed. Emails, Slack messages, and embedded URLs are stripped, normalized, and prepared for analysis." },
        { id: "02", title: "Machine Learning Triage", desc: "Our BERT-based NLP models perform semantic extraction, identifying subtle manipulations, urgency triggers, and LLM-generated fingerprints." },
        { id: "03", title: "Dynamic Sandbox", desc: "Suspicious attachments and redirect chains execute inside an isolated container. File system hooks monitor for malicious macros operations." },
        { id: "04", title: "Threat Convergence", desc: "Risk signals from content, behavior, and context converge. A unified confidence score determines mitigation and payload quarantine." }
    ];

    return (
        <section id="how-it-works" style={styles.section}>
            <div className="section-header">
                <h2 className="section-title">The Detection Pipeline</h2>
                <p className="section-subtitle">How Aegis.ai deconstructs an attack in milliseconds.</p>
            </div>
            
            <div style={styles.pipelineContainer}>
                {steps.map(step => (
                    <div key={step.id} className="glass-panel" style={styles.pipelineStep}>
                        <div style={styles.stepHeader}>
                            <span style={styles.stepId}>{step.id}</span>
                            <div style={styles.connector}></div>
                        </div>
                        <h3 style={styles.stepTitle}>{step.title}</h3>
                        <p style={styles.stepDesc}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '6rem 4rem',
        background: 'linear-gradient(180deg, rgba(10,14,23,0) 0%, rgba(0,210,255,0.02) 50%, rgba(10,14,23,0) 100%)',
        position: 'relative',
        zIndex: 2,
    },
    pipelineContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        gap: '2rem',
        flexWrap: 'wrap'
    },
    pipelineStep: {
        flex: 1,
        minWidth: '220px',
        padding: '2.5rem 2rem',
        position: 'relative',
        transition: 'transform 0.4s ease',
        cursor: 'default',
        background: 'linear-gradient(145deg, rgba(16,24,39,0.7) 0%, rgba(10,14,23,0.8) 100%)'
    },
    stepHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    stepId: {
        fontSize: '2.5rem',
        fontWeight: 800,
        color: 'rgba(0, 210, 255, 0.2)',
        fontFamily: 'Orbitron, sans-serif'
    },
    connector: {
        height: '2px',
        flex: 1,
        background: 'linear-gradient(90deg, rgba(0,210,255,0.5), transparent)',
        marginLeft: '1rem'
    },
    stepTitle: {
        fontSize: '1.3rem',
        marginBottom: '1rem',
        color: 'var(--primary-accent)'
    },
    stepDesc: {
        fontSize: '0.95rem',
        color: 'var(--text-dim)',
        lineHeight: 1.7
    }
};

export default Architecture;
