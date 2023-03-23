// when user checks sandbox checkbox in extension popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.sandbox == true) {
        // run enableSandbox script in active tab
        chrome.tabs.executeScript(null, { file: "enableSandbox.js" });
    } else {
        // run disableSandbox script in active tab
        chrome.tabs.executeScript(null, { file: "disableSandbox.js" });
    }
});
