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
chrome.storage.sync.get("eEnabled", (data) => {
    toggleE(data.eEnabled);
});
chrome.storage.sync.get("mmbShowsPasswordsEnabled", (data) => {
    toggleMMBShowsPasswords(data.mmbShowsPasswordsEnabled);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // listen to toggle messages
    if (message.type === "toggleSandbox") {
        toggleSandbox(message.enabled);
    }
    if (message.type === "toggleSharpCorners") {
        toggleSharpCorners(message.enabled);
    }
    if (message.type === "toggleE") {
        toggleE(message.enabled);
    }
    if (message.type === "toggleMMBShowsPasswords") {
        toggleMMBShowsPasswords(message.enabled);
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
        chrome.storage.sync.get("eEnabled", (data) => {
            toggleE(data.eEnabled);
        });
        chrome.storage.sync.get("mmbShowsPasswordsEnabled", (data) => {
            toggleMMBShowsPasswords(data.mmbShowsPasswordsEnabled);
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

// track mouse
let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

// checks so stupidly because document.getElementFromPoint() doesn't return disabled elements
function eHandler(event) {
    if (event.key === "e") {
        // get all disabled elements on page
        const disabledElements = document.querySelectorAll("[disabled]");

        disabledElements.forEach((element) => {
            // get element bounds
            const bounds = element.getBoundingClientRect();

            // check if mouse is inside element bounds (with a 10px margin because mousemove doesn't fire when mouse is over a disabled element)
            if (
                mouse.x + 10 >= bounds.left &&
                mouse.x - 10 <= bounds.right &&
                mouse.y + 10 >= bounds.top &&
                mouse.y - 10 <= bounds.bottom
            ) {
                // enable element
                element.removeAttribute("disabled");
                event.preventDefault();
            }
        });
    }
}

function toggleE(enabled) {
    if (enabled) {
        document.body.addEventListener("keydown", eHandler);
    } else {
        document.body.removeEventListener("keydown", eHandler);
    }
}

function mmbHandler(event) {
    if (event.button === 1) {
        // get element under mouse
        const element = document.elementFromPoint(mouse.x, mouse.y);

        // toggle password visibility
        if (element.type === "password") {
            element.type = "text";
            element.classList.add("chrutils-password-visible");
            event.preventDefault();
        } else if (element.classList.contains("chrutils-password-visible")) {
            element.type = "password";
            element.classList.remove("chrutils-password-visible");
            event.preventDefault();
        }
    }
}

function toggleMMBShowsPasswords(enabled) {
    if (enabled) {
        document.body.addEventListener("mousedown", mmbHandler);
    } else {
        document.body.removeEventListener("mousedown", mmbHandler);
    }
}
