import React from 'react';
import PageLayout from '../components/PageLayout';
import { ShieldCheck, Lock, WifiOff, RefreshCcw } from 'lucide-react';

const BestPractices = () => {
    const practices = [
        { icon: ShieldCheck, title: "Enable Two-Factor Authentication (2FA)", p: "Always enable 2FA on crucial accounts. Even if an attacker steals your password via phishing, they cannot log in without your secondary physical device." },
        { icon: Lock, title: "Use Strong, Unique Passwords", p: "Never reuse passwords across sites. Use a reputable password manager to generate complex, cryptographically secure passwords for every service." },
        { icon: WifiOff, title: "Avoid Public WiFi for Sensitive Tasks", p: "Public networks can be monitored or spoofed (Evil Twin attacks). Use a trusted VPN or cellular data if you must access banking or corporate infrastructure." },
        { icon: RefreshCcw, title: "Update Software Regularly", p: "Updates patch zero-day vulnerabilities. Falling victim to a phishing payload is much harder if your OS and browser are secured against known exploits." }
    ];

    return (
        <PageLayout 
            title="Security Best Practices" 
            subtitle="The fundamental habits of a hard target."
        >
            <div style={styles.grid}>
                {practices.map((item, i) => {
                    const Icon = item.icon;
                    return (
                        <div key={i} className="glass-panel" style={styles.card}>
                            <div style={styles.iconCircle}>
                                <Icon size={32} color="#00D2FF" />
                            </div>
                            <div>
                                <h3 style={styles.title}>{item.title}</h3>
                                <p style={styles.text}>{item.p}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </PageLayout>
    );
};

const styles = {
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    card: {
        padding: '2.5rem',
        display: 'flex',
        gap: '2rem',
        alignItems: 'center'
    },
    iconCircle: {
        minWidth: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(0, 210, 255, 0.1)',
        border: '1px solid rgba(0, 210, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: '1.5rem',
        color: 'var(--text-light)',
        marginBottom: '0.8rem'
    },
    text: {
        color: 'var(--text-dim)',
        lineHeight: 1.6
    }
};

export default BestPractices;
