function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  try {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    const currentUrl = tab.url;
    const qrcodeContainer = document.getElementById("qrcode");
    
    if (qrcodeContainer) {
      new QRCode(qrcodeContainer, {
        text: currentUrl,
        width: 256,
        height: 256
      });
      console.log('QR code generated successfully');
    } else {
      throw new Error("QR code container not found");
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});