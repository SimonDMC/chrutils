chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // listen to sandbox toggle message
    if (message.type === "toggleSandbox") {
        if (message.enabled) {
            document.body.contentEditable = true;
        } else {
            document.body.contentEditable = false;
        }
    }
});
