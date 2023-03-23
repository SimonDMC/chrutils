// get the checkbox
const checkBox = document.getElementById("sandbox");

// add event listener
checkBox.addEventListener("change", (event) => {
    // send message to background script
    chrome.runtime.sendMessage({ sandbox: event.target.checked });
});
