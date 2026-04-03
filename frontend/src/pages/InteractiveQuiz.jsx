import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';

const quizData = [
    {
        from: "Apple Support <noreply@apple-auth-update.com>",
        subject: "Action Required: Your Apple ID has been locked",
        body: "We detected unauthorized login attempts. To restore access to your iCloud and Apple services, please verify your identity immediately.",
        btnText: "Unlock Account",
        isPhish: true,
        explanation: "The domain 'apple-auth-update.com' is typosquatting. Real Apple emails come from 'apple.com'. The email creates a false sense of urgency."
    },
    {
        from: "HR Department <internal-hr@company.com>",
        subject: "Updated Q3 Holiday Policy",
        body: "Team, please review the attached PDF regarding the updated holiday schedules and PTO accrual rates for the upcoming quarter.",
        btnText: "Download Policy.pdf",
        isPhish: false,
        explanation: "This is a legitimate internal email structure assuming the domain matches exactly. However, always verify attachments if unexpected."
    },
    {
        from: "Netflix <help@netflix.com>",
        subject: "Payment Declined",
        body: "Hi Customer, we couldn't process your last billing cycle. Your membership will be canceled in 24 hours. Update your payment details.",
        btnText: "Update Payment Info",
        isPhish: true,
        explanation: "Phishing emails often use generic greetings ('Hi Customer') rather than your real name, combined with a 24-hour threat."
    },
    {
        from: "IT Helpdesk <support@company.com>",
        subject: "Mandatory Password Reset",
        body: "As per the new security mandate signed by the CEO today, all employees must reset their portal passwords using the link below before EOD.",
        btnText: "Reset Portal Password",
        isPhish: true,
        explanation: "A classic spear-phishing tactic. It leverages authority (the CEO) and an extreme time constraint (EOD) to force rapid compliance without thinking."
    },
    {
        from: "GitHub <noreply@github.com>",
        subject: "[GitHub] Dependabot Alert: Critical Vulnerability",
        body: "Dependabot has discovered a critical level vulnerability in your 'aegis-frontend' repository. Review the pull request to merge the patch.",
        btnText: "Review Pull Request",
        isPhish: false,
        explanation: "This is a standard, automated security notification from GitHub. The domain is correct and there is no coercive social engineering."
    }
];

const InteractiveQuiz = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selection, setSelection] = useState(null);
    const [quizFinished, setQuizFinished] = useState(false);

    const handleAnswer = (userChoice) => {
        const isPhish = userChoice === 'phish';
        const correct = isPhish === quizData[currentIndex].isPhish;
        if (correct) setScore(prev => prev + 1);
        setSelection(correct ? 'correct' : 'incorrect');
    };

    const nextQuestion = () => {
        if (currentIndex < quizData.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelection(null);
        } else {
            setQuizFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentIndex(0);
        setScore(0);
        setSelection(null);
        setQuizFinished(false);
    };

    return (
        <PageLayout 
            title="Interactive Threat Quiz" 
            subtitle="Test your ability to spot deceptive indicators in real-world scenarios."
        >
            <div className="glass-panel" style={styles.quizBox}>
                {!quizFinished ? (
                    <>
                        <div style={styles.progress}>Question {currentIndex + 1} of {quizData.length}</div>
                        
                        <div style={styles.emailMock}>
                            <p style={styles.headerRow}><strong>From:</strong> {quizData[currentIndex].from}</p>
                            <p style={styles.headerRow}><strong>Subject:</strong> {quizData[currentIndex].subject}</p>
                            <hr style={styles.hr} />
                            <p style={styles.bodyText}>{quizData[currentIndex].body}</p>
                            <div style={styles.btnMock}>{quizData[currentIndex].btnText}</div>
                        </div>

                        {selection === null ? (
                            <div style={styles.actionArea}>
                                <h3 style={styles.prompt}>Is this email legitimate or phishing?</h3>
                                <div style={styles.buttons}>
                                    <button className="btn btn-primary" onClick={() => handleAnswer('legit')} style={{borderColor: '#4CAF50', color: '#4CAF50'}}>Legitimate</button>
                                    <button className="btn btn-primary" onClick={() => handleAnswer('phish')} style={{borderColor: '#FFB300', color: '#FFB300'}}>Phishing</button>
                                </div>
                            </div>
                        ) : (
                            <div style={{...styles.actionArea, ...styles.resultBox}}>
                                <h3 style={{color: selection === 'correct' ? '#00D2FF' : '#FFB300', marginBottom: '1rem'}}>
                                    {selection === 'correct' ? 'Correct!' : 'Incorrect.'}
                                </h3>
                                <p style={styles.explanation}>{quizData[currentIndex].explanation}</p>
                                <button className="btn btn-primary" onClick={nextQuestion} style={{marginTop: '2rem'}}>
                                    {currentIndex < quizData.length - 1 ? 'Next Question' : 'View Final Score'}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div style={{textAlign: 'center', padding: '2rem'}}>
                        <h2 style={{fontSize: '2.5rem', color: 'var(--primary-accent)', marginBottom: '1rem'}}>Quiz Complete!</h2>
                        <h1 style={{fontSize: '5rem', margin: '2rem 0', fontFamily: 'Orbitron, sans-serif'}}>
                            {score} / {quizData.length}
                        </h1>
                        <p style={{color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '3rem'}}>
                            {score === 5 ? "Flawless. You're a cybersecurity native." : 
                             score >= 3 ? "Good instincts, but you missed a few subtle cues." : 
                             "You are highly vulnerable to social engineering. Rely on Aegis.ai!"}
                        </p>
                        <button className="btn btn-primary" onClick={resetQuiz}>Retake Training</button>
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

const styles = {
    quizBox: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '3rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        minHeight: '600px',
        justifyContent: 'center'
    },
    progress: {
        color: 'var(--primary-accent)',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        textAlign: 'center'
    },
    emailMock: {
        background: '#ffffff',
        padding: '2.5rem',
        borderRadius: '8px',
        color: '#222',
        fontFamily: 'Arial, sans-serif',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)'
    },
    headerRow: { margin: '0.5rem 0', fontSize: '1rem' },
    hr: { border: '0', borderTop: '2px solid #eee', margin: '1.5rem 0' },
    bodyText: { margin: '1rem 0', lineHeight: 1.6, fontSize: '1rem' },
    btnMock: {
        display: 'inline-block',
        padding: '12px 24px',
        background: '#0056b3',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        margin: '1.5rem 0'
    },
    actionArea: {
        textAlign: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid var(--glass-border)'
    },
    prompt: {
        marginBottom: '2rem',
        fontSize: '1.4rem'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem'
    },
    resultBox: {
        background: 'rgba(0, 0, 0, 0.4)',
        padding: '3rem',
        borderRadius: '8px',
        borderLeft: '4px solid var(--primary-accent)'
    },
    explanation: {
        color: 'var(--text-light)',
        lineHeight: 1.8,
        fontSize: '1.1rem'
    }
};

export default InteractiveQuiz;
