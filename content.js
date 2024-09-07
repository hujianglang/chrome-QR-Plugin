let qrContainer = null;

function injectQRCodeScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('qrcode.min.js');
    script.onload = resolve;
    script.onerror = reject;
    (document.head || document.documentElement).appendChild(script);
  });
}

async function createQRCode(url) {
  console.log('Creating QR code for:', url);
  if (qrContainer) return;
  
  qrContainer = document.createElement('div');
  qrContainer.id = 'extension-qr-code-container';
  qrContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    display: none;
  `;

  const qrCode = document.createElement('div');
  qrCode.id = 'extension-qr-code';
  qrContainer.appendChild(qrCode);

  document.body.appendChild(qrContainer);

  try {
    await injectQRCodeScript();
    new QRCode(qrCode, {
      text: url,
      width: 128,
      height: 128
    });
    console.log('QR code created and added to DOM');
  } catch (error) {
    console.error('Error creating QR code:', error);
  }
}

async function toggleQRCode(visible) {
  if (!qrContainer) {
    await createQRCode(window.location.href);
  }
  if (qrContainer) {
    qrContainer.style.display = visible ? 'block' : 'none';
    console.log('QR code visibility set to:', visible);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in content script:', request);
  if (request.action === "toggleQRCode") {
    toggleQRCode(request.visible);
  }
});

console.log('Content script loaded');
chrome.runtime.sendMessage({ action: "contentScriptReady" });