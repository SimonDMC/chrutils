// set sandbox state from storage
chrome.storage.sync.get("sandboxEnabled", (data) => {
    toggleSandbox(data.sandboxEnabled);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // listen to sandbox toggle message
    if (message.type === "toggleSandbox") {
        toggleSandbox(message.enabled);
    }
});

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        // set sandbox state from storage
        chrome.storage.sync.get("sandboxEnabled", (data) => {
            toggleSandbox(data.sandboxEnabled);
        });
    }
});

function toggleSandbox(enabled) {
    if (enabled) {
        document.body.contentEditable = true;
    } else {
        document.body.contentEditable = false;
    }
}
