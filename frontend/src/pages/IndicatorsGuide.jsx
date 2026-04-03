import React from 'react';
import PageLayout from '../components/PageLayout';
import { AlertTriangle, Link, UserX, FileWarning, TextCursorInput, Globe } from 'lucide-react';

const IndicatorsGuide = () => {
    const indicators = [
        { icon: AlertTriangle, title: "Urgent Language", desc: "Phrases like 'Account will be suspended in 24 hours' are designed to induce panic and force mistakes." },
        { icon: Link, title: "Suspicious Links", desc: "Hover over a link before clicking. Is the domain what you expect, or is it slightly misspelled (e.g., paypa1.com)?" },
        { icon: UserX, title: "Unknown Sender", desc: "Be wary of external emails from unknown individuals requesting internal actions, wire transfers, or gift cards." },
        { icon: FileWarning, title: "Unexpected Attachments", desc: "Invoices, tracking numbers, or 'scanned documents' from unexpected senders usually contain malware logic." },
        { icon: TextCursorInput, title: "Grammar Mistakes", desc: "While AI makes phishing structurally cleaner, many attacks still feature odd phrasing or poor formatting." },
        { icon: Globe, title: "Fake Domains", desc: "Attackers register domains that look nearly identical to the brand they are spoofing. Always check the URL explicitly." }
    ];

    return (
        <PageLayout 
            title="Common Phishing Indicators" 
            subtitle="Equip your team with the manual skills to spot what automated systems might miss."
        >
            <div style={styles.grid}>
                {indicators.map((ind, i) => {
                    const Icon = ind.icon;
                    return (
                        <div key={i} className="glass-panel" style={styles.card}>
                            <Icon size={40} color="var(--primary-accent)" style={{marginBottom: '1.5rem'}} />
                            <h3 style={styles.cardTitle}>{ind.title}</h3>
                            <p style={styles.desc}>{ind.desc}</p>
                        </div>
                    );
                })}
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
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderTop: '3px solid transparent',
        transition: 'border-color 0.3s'
    },
    cardTitle: {
        fontSize: '1.4rem',
        marginBottom: '1rem',
        color: 'var(--text-light)'
    },
    desc: {
        color: 'var(--text-dim)',
        lineHeight: 1.6
    }
};

export default IndicatorsGuide;
