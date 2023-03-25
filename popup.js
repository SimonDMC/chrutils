const toggles = [
    {
        element: document.getElementById("sandbox"),
        enabledLabel: "sandboxEnabled",
        toggleLabel: "toggleSandbox",
    },
    {
        element: document.getElementById("sharp-corners"),
        enabledLabel: "sharpCornersEnabled",
        toggleLabel: "toggleSharpCorners",
    },
    {
        element: document.getElementById("e-enable"),
        enabledLabel: "eEnabled",
        toggleLabel: "toggleE",
    },
    {
        element: document.getElementById("mmb-shows-passwords"),
        enabledLabel: "mmbShowsPasswordsEnabled",
        toggleLabel: "toggleMMBShowsPasswords",
    },
];

// load states
toggles.forEach((toggle) => {
    chrome.storage.sync.get(toggle.enabledLabel, (data) => {
        toggle.element.checked = data[toggle.enabledLabel];
    });
});

// add event listeners
toggles.forEach((toggle) => {
    toggle.element.addEventListener("change", (event) => {
        // send message to content script
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: toggle.toggleLabel,
                    enabled: toggle.element.checked,
                });
            }
        );

        // save state
        chrome.storage.sync.set({
            [toggle.enabledLabel]: toggle.element.checked,
        });
    });
});
