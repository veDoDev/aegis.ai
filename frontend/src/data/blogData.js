export const blogData = [
    {
        id: "llm-spear-phishing",
        date: "Apr 02, 2026",
        title: "The Rise of LLM-Generated Spear Phishing",
        excerpt: "How threat actors use open-source language models to craft flawless, context-aware phishing emails.",
        content: `
# The Rise of LLM-Generated Spear Phishing

For decades, the easiest way to manually detect a phishing email was poor grammar, awkward syntax, or cultural mistranslations. **That era is over.**

With the proliferation of open-source Large Language Models (LLMs) like LLaMA-3 and Mixtral, threat actors no longer struggle with syntax. They are automating the creation of highly-targeted, grammatically flawless spear-phishing emails.

### The Attack Chain
1. **OSINT Gathering:** Attackers scrape LinkedIn, Twitter, and corporate blogs for the victim's recent activities.
2. **LLM Prompting:** The attacker feeds this scrape into an LLM: *"Write an urgent email from the CFO to [Victim's Name] regarding the recent merger mentioned on LinkedIn. Ask them to review the attached Q3 projections."*
3. **Execution:** The resulting email is completely indistinguishable from human corporate communication.

### Defending the New Frontier
Because the semantic content is flawless, traditional email gateways (SEGs) fail. Defense now relies entirely on **behavioral analysis** and **metadata inspection**:
- Authenticating DMARC/DKIM/SPF strictly.
- Tracking anomalous login geos immediately following link clicks.
- Using adversarial LLMs to detect the subtle probabilistic fingerprints of generated text.
        `
    },
    {
        id: "aitm-mfa-bypass",
        date: "Mar 28, 2026",
        title: "Bypassing MFA via Adversary-in-the-Middle (AitM)",
        excerpt: "How AitM attacks intercept session cookies, rendering basic SMS 2FA systems vulnerable.",
        content: `
# Bypassing MFA via Adversary-in-the-Middle

Multi-factor authentication (MFA) was supposed to be the silver bullet against phishing. If an attacker stole your password, they still couldn't log in without your phone. 

However, **Adversary-in-the-Middle (AitM)** frameworks like Evilginx2 have evolved to steal something even better than a password: **The Session Cookie.**

### The Mechanics of Cookie Theft
When a user clicks a phishing link, they aren't taken to a fake HTML page. Instead, they hit a reverse proxy controlled by the attacker. 
1. The proxy forwards the user's request to the real Microsoft 365 or Google login page.
2. The user sees the legitimate login page and enters their password.
3. The real server sends the SMS MFA code. The user enters it.
4. The real server validates the MFA and issues a **Session Authentication Cookie**.
5. The proxy **intercepts and steals this cookie** before passing it to the user.

### Why This is Devastating
The attacker no longer needs the username, password, or the MFA token. They inject the stolen Session Cookie directly into their own browser and bypass the entire login portal entirely.

**The Solution:** Transitioning to FIDO2 hardware keys (like YubiKeys) or passkeys, which cryptographically bind the authentication session to the strictly requested domain.
        `
    },
    {
        id: "qakbot-vacuum",
        date: "Mar 15, 2026",
        title: "Qakbot Demise and The Malware Vacuum",
        excerpt: "Following the takedown of Qakbot, which botnets are stepping in to deliver initial access payloads?",
        content: `
# Qakbot Demise and The Malware Vacuum

In late 2023, the FBI and international partners dismantled Qakbot, one of the most prolific malware delivery botnets in history. Qakbot was the primary vehicle through which ransomware gangs (like BlackBasta and Conti) obtained initial access to corporate networks via phishing.

### Who is filling the void?
Nature abhors a vacuum, and so does cybercrime. Three major threats have surged:
1. **Pikabot:** Extremely similar to Qakbot in code structure, suggesting former affiliates have spun up a successor.
2. **DarkGate:** A highly sophisticated loader utilizing complex AutoIt scripts to evade endpoint detection.
3. **AsyncRAT:** A commodity remote access trojan heavily utilized by less sophisticated threat actors but deployed in massive spam waves.

### Mitigation
Network defenders must adapt by scrutinizing HTML smuggling techniques and disabling MSIX app installer protocols, as attackers transition away from Office Macros.
        `
    },
    {
        id: "zero-day-phish",
        date: "Feb 22, 2026",
        title: "Defending Against Zero-Day Infrastructure",
        excerpt: "Why domain registration age is the best weapon against rapidly spinning-up malicious domains.",
        content: `
# Defending Against Zero-Day Infrastructure

When a new phishing campaign launches, attackers register completely new domains. Because these domains have never been seen before, they have a "neutral" reputation on threat intelligence feeds.

### The Problem with Blacklists
Rule-based blacklists are inherently reactive. If an attacker registers \`paypal-secure-auth1.com\`, it will take hours for security researchers to find it, flag it, and push the update to firewalls. By that time, the campaign is over.

### Proactive Defense: Domain Age
Aegis.ai relies heavily on **Domain Age** as a primary deterministic factor. If an email claims to be from a Fortune 500 bank, but the domain executing the sender policy was registered 4 hours ago on Namecheap, the system acts deterministically: **Block**.

Combining Domain Age with Levenshtein Distance (typo detection) completely neutralizes 90% of zero-day infrastructure before a blacklist ever needs to update.
        `
    }
];
