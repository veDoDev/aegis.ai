import React from 'react';
import PageLayout from '../components/PageLayout';

const CaseStudies = () => {
    return (
        <PageLayout 
            title="Real-World Case Studies" 
            subtitle="Deconstructing famous phishing incidents from recent history to understand adversary methodology."
        >
            <div style={styles.container}>
                <div className="glass-panel" style={styles.study}>
                    <h2 style={styles.studyTitle}>The Target HVAC Vendor Breach (2013)</h2>
                    <div style={styles.grid}>
                        <div>
                            <h4 style={styles.subHeader}>How it Worked</h4>
                            <p style={styles.text}>Attackers didn't phish Target employees directly. Instead, they compromised Fazio Mechanical Services, an HVAC contractor for Target, via a standard phishing email packed with a Citadel trojan. The attackers waited, stole the contractor's credentials to Target's vendor portal, and moved laterally into Target's PoS network.</p>
                        </div>
                        <div>
                            <h4 style={styles.subHeader}>The Impact</h4>
                            <p style={styles.text}>Over 40 million credit and debit card records and 70 million customer records were stolen. The CEO resigned, and Target faced settlements estimated at $200+ million. It highlighted the devastating impact of third-party supply chain phishing.</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={styles.study}>
                    <h2 style={styles.studyTitle}>The RSA SecurID Token Hack (2011)</h2>
                    <div style={styles.grid}>
                        <div>
                            <h4 style={styles.subHeader}>How it Worked</h4>
                            <p style={styles.text}>A perfectly crafted spear-phishing email with the subject "2011 Recruitment Plan" was sent to a small group of RSA employees. It contained a malicious Excel sheet that leveraged a zero-day vulnerability in Adobe Flash to secretly install a backdoor (Poison Ivy RAT).</p>
                        </div>
                        <div>
                            <h4 style={styles.subHeader}>The Impact</h4>
                            <p style={styles.text}>Attackers successfully exfiltrated the seed values for RSA's widely-used SecurID two-factor authentication tokens. This effectively compromised the 2FA security of countless military contractors and Fortune 500 companies relying on the hardware tokens.</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={styles.study}>
                    <h2 style={styles.studyTitle}>Twitter VIP Bitcoin Scam (2020)</h2>
                    <div style={styles.grid}>
                        <div>
                            <h4 style={styles.subHeader}>How it Worked</h4>
                            <p style={styles.text}>A 17-year-old hacker targeted Twitter's IT staff using a highly coordinated "Vishing" (Voice Phishing) campaign over the phone. Posing as internal helpdesk IT, they convinced employees to use their credentials on a fake VPN portal that bypassed 2FA.</p>
                        </div>
                        <div>
                            <h4 style={styles.subHeader}>The Impact</h4>
                            <p style={styles.text}>Attackers hijacked the admin panel and took control of 130 high-profile accounts, including Barack Obama, Elon Musk, and Apple. They tweeted a massive Bitcoin doubling scam, destroying public trust in the platform and netting roughly $120,000 in hours.</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={styles.study}>
                    <h2 style={styles.studyTitle}>The 2017 Google Docs OAuth Worm</h2>
                    <div style={styles.grid}>
                        <div>
                            <h4 style={styles.subHeader}>How it Worked</h4>
                            <p style={styles.text}>Millions of users received an email from someone they knew saying "so-and-so has shared a document on Google Docs with you." Clicking the link brought them to a real Google sign-in page, requesting OAuth permissions for a malicious third-party app masquerading as "Google Docs."</p>
                        </div>
                        <div>
                            <h4 style={styles.subHeader}>Detection Failure</h4>
                            <p style={styles.text}>Because the link pointed to genuine `accounts.google.com` (to grant the OAuth token), traditional URL scanners saw no malicious domain. Semantic engine analysis would be required to flag the behavioral intent.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
    },
    study: {
        padding: '3rem',
        borderTop: '2px solid var(--secondary-accent)'
    },
    studyTitle: {
        fontSize: '2rem',
        color: 'var(--text-light)',
        marginBottom: '2rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
    },
    subHeader: {
        color: 'var(--primary-accent)',
        marginBottom: '1rem',
        fontSize: '1.2rem'
    },
    text: {
        color: 'var(--text-dim)',
        lineHeight: 1.7
    }
};

export default CaseStudies;
