/**
 * PhishGuard — Background Service Worker
 * Handles all API communication with the Django backend.
 * Acts as a proxy between content scripts, popup, and the server.
 */

const DEFAULT_API_URL = 'http://localhost:8000';

// ─── Get configured API URL ─────────────────────────────────────────
async function getApiUrl() {
    try {
        const result = await chrome.storage.sync.get(['apiUrl']);
        return result.apiUrl || DEFAULT_API_URL;
    } catch {
        return DEFAULT_API_URL;
    }
}

// ─── API Calls ──────────────────────────────────────────────────────
async function analyzeText(text) {
    const apiUrl = await getApiUrl();
    const resp = await fetch(`${apiUrl}/api/ext/analyze-text/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });
    return resp.json();
}

async function analyzeUrl(url) {
    const apiUrl = await getApiUrl();
    const resp = await fetch(`${apiUrl}/api/ext/analyze-url/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });
    return resp.json();
}

async function analyzeImage(imageUrl) {
    const apiUrl = await getApiUrl();
    const resp = await fetch(`${apiUrl}/api/ext/analyze-image/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: imageUrl }),
    });
    return resp.json();
}

async function analyzeAttachment(fileData, fileName) {
    const apiUrl = await getApiUrl();
    // Convert base64 back to blob
    const byteChars = atob(fileData);
    const byteArr = new Uint8Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
        byteArr[i] = byteChars.charCodeAt(i);
    }
    const blob = new Blob([byteArr]);

    const formData = new FormData();
    formData.append('email_text', `Attachment analysis: ${fileName}`);
    formData.append('attachments', blob, fileName);

    const resp = await fetch(`${apiUrl}/api/detect/`, {
        method: 'POST',
        body: formData,
    });
    return resp.json();
}

// ─── Network Isolation Trigger ──────────────────────────────────────
async function triggerIsolation(result) {
    // Only trigger for High/Critical threats
    if (result.risk_level === 'HIGH' || result.risk_level === 'CRITICAL' || result.prediction === 'Malicious') {
        try {
            console.warn('[PhishGuard] Critical threat! Triggering network isolation...');
            await fetch('http://127.0.0.1:5001/isolate', {
                method: 'POST',
                mode: 'no-cors' // Agent is local and doesn't need full CORS for this fire-and-forget call
            });

            // Notify popup/content that isolation is active
            chrome.storage.local.set({ isolationActive: true, isolationStartTime: Date.now() });
        } catch (e) {
            console.error('[PhishGuard] Failed to reach local agent for isolation:', e.message);
        }
    }
}

// ─── Message Handler ────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { action, data } = message;

    const handleAsync = async () => {
        try {
            let result;
            switch (action) {
                case 'analyzeUrl':
                    result = await analyzeUrl(data.url);
                    break;
                case 'analyzeText':
                    result = await analyzeText(data.text);
                    break;
                case 'analyzeImage':
                    result = await analyzeImage(data.imageUrl);
                    break;
                case 'analyzePage':
                    // Get page content from active tab
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    if (tab) {
                        const [{ result: pageText }] = await chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: () => document.body.innerText,
                        });
                        result = await analyzeText(pageText || '');
                    } else {
                        result = { prediction: 'Error', confidence: 0, risk_level: 'UNKNOWN', reasons: ['No active tab'] };
                    }
                    break;
                case 'getPageData':
                    // Return current tab URL
                    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    result = { url: activeTab?.url || '', title: activeTab?.title || '' };
                    break;
                case 'analyzeAttachment':
                    result = await analyzeAttachment(data.fileData, data.fileName);
                    break;
                default:
                    result = { error: `Unknown action: ${action}` };
            }

            // Trigger isolation check
            if (result && !result.error) {
                triggerIsolation(result);
            }

            sendResponse({ success: true, data: result });
        } catch (error) {
            console.error('[PhishGuard] Background error:', error);
            sendResponse({
                success: false,
                error: error.message || 'Backend connection failed. Is the server running?'
            });
        }
    };

    handleAsync();
    return true; // Keep message channel open for async response
});

// ─── Auto-scan on tab update ────────────────────────────────────────
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        try {
            const result = await analyzeUrl(tab.url);

            // Store result for popup to access
            await chrome.storage.local.set({
                [`scan_${tabId}`]: {
                    url: tab.url,
                    result,
                    timestamp: Date.now(),
                }
            });

            // Update badge based on result
            const color = result.risk_level === 'HIGH' ? '#ff3333'
                        : result.risk_level === 'MEDIUM' ? '#FFB300'
                        : '#00ff88';

            await chrome.action.setBadgeBackgroundColor({ color, tabId });
            await chrome.action.setBadgeText({
                text: result.risk_level === 'LOW' ? '✓' : '!',
                tabId,
            });

            // Trigger isolation for auto-scan results
            triggerIsolation(result);
        } catch (e) {
            // Backend might not be running — silent fail
            console.warn('[PhishGuard] Auto-scan failed:', e.message);
        }
    }
});

console.log('[PhishGuard] Background service worker loaded');
