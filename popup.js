// get the checkbox
const checkBox = document.getElementById("sandbox");

// add event listener
checkBox.addEventListener("change", (event) => {
    // send message to background script
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "toggleSandbox",
            enabled: checkBox.checked,
        });
    });
});
