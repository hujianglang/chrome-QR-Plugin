let isQRCodeVisible = false;

chrome.action.onClicked.addListener(async (tab) => {
  console.log('Extension icon clicked');
  try {
    if (tab.url.startsWith('chrome://')) {
      console.log('Cannot run on chrome:// pages');
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        console.log('Script injection check successful');
        return true;
      },
    });

    isQRCodeVisible = !isQRCodeVisible;
    console.log('Sending message to content script, visible:', isQRCodeVisible);
    
    // 使用 chrome.tabs.sendMessage 的回调函数版本
    chrome.tabs.sendMessage(tab.id, { action: "toggleQRCode", visible: isQRCodeVisible }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Message sent successfully, response:', response);
      }
    });

  } catch (error) {
    console.error('Error in background script:', error);
    if (error.message.includes("Cannot access contents of url")) {
      console.log('Cannot access page contents. This might be a chrome:// or extension page.');
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "contentScriptReady") {
    console.log('Content script ready message received');
  }
});