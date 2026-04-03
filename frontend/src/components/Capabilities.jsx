import React from 'react';
import { Mail, Link2, BrainCircuit, Activity } from 'lucide-react';

const Capabilities = () => {
    const features = [
        {
            title: "Advanced NLP Dissection",
            Icon: Mail,
            items: [
                "Identifies LLM-written phishing attempts.",
                "Flagging urgency syntax & credential requests.",
                "Sender domain spoofing detection."
            ]
        },
        {
            title: "URL Threat Matrix",
            Icon: Link2,
            items: [
                "Typo-squatting mathematical analysis.",
                "Live redirection chain mapping.",
                "Zero-day phishing domain age scoring."
            ]
        },
        {
            title: "Explainable Risk Scoring",
            Icon: BrainCircuit,
            items: [
                "We trace the 'Why' behind every block.",
                "Aggregate low/med/high risk metrics.",
                "Contextual insights for SecOps teams."
            ]
        },
        {
            title: "Behavioral Monitoring",
            Icon: Activity,
            items: [
                "Track multi-stage lateral flows.",
                "Detect email -> link -> payload progression.",
                "Identify campaign-level network clusters."
            ]
        }
    ];

    return (
        <section id="capabilities" style={styles.section}>
            <div className="section-header">
                <h2 className="section-title">Core Intelligence Capabilities</h2>
                <p className="section-subtitle">Beyond static rules. Adapting to how attacks evolve.</p>
            </div>
            
            {/* The important part: 4 cards strictly in a row */}
            <div style={styles.gridRow}>
                {features.map((feature, idx) => {
                    const Icon = feature.Icon;
                    return (
                        <div key={idx} className="glass-panel" style={styles.card}>
                            <div style={styles.iconWrapper}>
                                <Icon size={32} color="var(--primary-accent)" />
                            </div>
                            <h3 style={styles.cardTitle}>{feature.title}</h3>
                            <ul style={styles.list}>
                                {feature.items.map((item, i) => (
                                    <li key={i} style={styles.listItem}>
                                        <span style={styles.check}>✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '6rem 4rem',
        position: 'relative',
        zIndex: 2,
    },
    // Enforcing a strict 4-column row layout per user request
    gridRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
        alignItems: 'stretch'
    },
    card: {
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        borderTop: '3px solid var(--primary-accent)',
        cursor: 'default'
    },
    iconWrapper: {
        backgroundColor: 'rgba(0, 210, 255, 0.1)',
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        border: '1px solid rgba(0, 210, 255, 0.2)'
    },
    cardTitle: {
        fontSize: '1.3rem',
        marginBottom: '1.5rem',
        color: 'var(--text-light)',
        letterSpacing: '0.5px'
    },
    list: {
        listStyle: 'none',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    listItem: {
        color: 'var(--text-dim)',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'flex-start',
        lineHeight: 1.5
    },
    check: {
        color: 'var(--primary-accent)',
        fontWeight: 'bold',
        marginRight: '10px',
        marginTop: '2px'
    }
};

export default Capabilities;
