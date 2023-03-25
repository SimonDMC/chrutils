// get the checkbox
const checkBox = document.getElementById("sandbox");

// load state
chrome.storage.sync.get("sandboxEnabled", (data) => {
    checkBox.checked = data.sandboxEnabled;
});

// add event listener
checkBox.addEventListener("change", (event) => {
    // send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "toggleSandbox",
            enabled: checkBox.checked,
        });
    });

    // save state
    chrome.storage.sync.set({ sandboxEnabled: checkBox.checked });
});
