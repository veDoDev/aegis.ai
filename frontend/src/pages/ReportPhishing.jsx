import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { UploadCloud } from 'lucide-react';

const ReportPhishing = () => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call to the backend for analysis
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <PageLayout 
            title="Submit Suspicious Content" 
            subtitle="Forward concerning emails and files directly to the Aegis sandbox for immediate triage."
        >
            <div className="glass-panel" style={styles.formContainer}>
                {submitted ? (
                    <div style={styles.successBox}>
                        <h2 style={{color: '#00D2FF', marginBottom: '1rem'}}>Intel Successfully Received</h2>
                        <p style={{color: 'var(--text-dim)'}}>Thank you for reporting. This payload has been routed to our dynamic sandboxes. A threat report will be generated shortly.</p>
                        <button className="btn btn-primary" onClick={() => setSubmitted(false)} style={{marginTop: '2rem'}}>Submit Another</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Suspicious Sender Details</label>
                            <input type="text" placeholder="e.g. security@paypal-verify-now.com" required style={styles.input} />
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Paste Raw Email Content or Headers</label>
                            <textarea placeholder="Paste the suspicious text here..." required style={styles.textarea}></textarea>
                        </div>
                        
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Upload Evidence (Screenshots/EML)</label>
                            <div style={styles.dropzone}>
                                <UploadCloud size={40} color="var(--primary-accent)" style={{marginBottom: '1rem'}} />
                                <p style={{color: 'var(--text-dim)'}}>Drag & drop files or click to browse</p>
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary" disabled={submitting} style={{width: '100%', marginTop: '1rem'}}>
                            {submitting ? 'Analyzing Payload...' : 'Submit to Sandbox'}
                        </button>
                    </form>
                )}
            </div>
        </PageLayout>
    );
};

const styles = {
    formContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '3rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
    },
    label: {
        color: 'var(--primary-accent)',
        fontWeight: '600',
        fontSize: '1.1rem'
    },
    input: {
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s'
    },
    textarea: {
        padding: '1rem',
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        color: 'white',
        fontSize: '1rem',
        minHeight: '150px',
        resize: 'vertical',
        outline: 'none',
        transition: 'border-color 0.3s'
    },
    dropzone: {
        padding: '3rem',
        border: '2px dashed rgba(0, 210, 255, 0.3)',
        borderRadius: '8px',
        textAlign: 'center',
        background: 'rgba(0, 210, 255, 0.02)',
        cursor: 'pointer',
        transition: 'background 0.3s'
    },
    successBox: {
        textAlign: 'center',
        padding: '4rem 2rem'
    }
};

// Add focus states
const injectedStyles = `
    input:focus, textarea:focus { border-color: var(--primary-accent) !important; }
    .dropzone:hover { background: rgba(0, 210, 255, 0.05) !important; }
`;
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = injectedStyles;
    document.head.appendChild(styleSheet);
}

export default ReportPhishing;
