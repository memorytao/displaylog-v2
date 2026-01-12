export const copyToClipboard = (text) => {
    // วิธีที่ 1: HTTPS หรือ Localhost
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Copied (Secure)"))
            .catch((err) => console.error("Copy failed", err));
    } else {
        // วิธีที่ 2: HTTP (Fallback)
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            console.log('Copied (Fallback)');
        } catch (err) {
            console.error('Copy failed (Fallback)', err);
        }
        document.body.removeChild(textArea);
    }
};