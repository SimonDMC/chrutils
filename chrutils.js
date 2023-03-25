// add css to head
const style = document.createElement("style");
style.innerHTML = `
body.sharp-corners * {
    border-radius: 0 !important;
}
`;
document.head.appendChild(style);

// set states from storage
chrome.storage.sync.get("sandboxEnabled", (data) => {
    toggleSandbox(data.sandboxEnabled);
});
chrome.storage.sync.get("sharpCornersEnabled", (data) => {
    toggleSharpCorners(data.sharpCornersEnabled);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // listen to toggle messages
    if (message.type === "toggleSandbox") {
        toggleSandbox(message.enabled);
    }
    if (message.type === "toggleSharpCorners") {
        toggleSharpCorners(message.enabled);
    }
});

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
        // set states from storage
        chrome.storage.sync.get("sandboxEnabled", (data) => {
            toggleSandbox(data.sandboxEnabled);
        });
        chrome.storage.sync.get("sharpCornersEnabled", (data) => {
            toggleSharpCorners(data.sharpCornersEnabled);
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

function toggleSharpCorners(enabled) {
    if (enabled) {
        document.body.classList.add("sharp-corners");
    } else {
        document.body.classList.remove("sharp-corners");
    }
}

function getCurrentTabId() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                resolve(tabs[0].id);
            } else {
                reject(new Error("No active tab found"));
            }
        });
    });
}
