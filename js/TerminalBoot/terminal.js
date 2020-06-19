/* 
 * Derived from https://tlijm.csb.app with heavy modifications 
 * Licensed under MIT
*/

/*
* True if the laoding screen is still showing.
*/
var loading = false;

/*
* Types the given text on the screen 
*/
async function type(
    text,
    {
        // Wait between chars.
        wait = 50,
        // Initial wait before typing.
        initialWait = 10,
        // Wait after done typing.
        finalWait = 750,
        // True uses the passed container, else we make a new div.
        useContainer = false
    } = {},
    container = document.querySelector(".terminal")
) {
    loading = true;
    setNavBarStatus(false);
    let typerDiv = useContainer ? container : document.createElement("div");
    typerDiv.classList.add("typer", "active");
    if (!useContainer) {
        container.appendChild(typerDiv);
    }

    if (initialWait) {
        await pause(initialWait / 1000);
    }

    // Did we get passed an array?
    if (Array.isArray(text)) {
        // Join it to a text string.
        text = text.join("\n");
    }
    // split the text into a queue to iterate over
    let queue = text.split("");

    while (queue.length && loading) {
        // shifts the next character out of the queue.
        let char = queue.shift();
        // Get the element in html form.
        let element = getChar(char);
        if (element) {
            typerDiv.appendChild(element);
        }
        scroll(container);

        // Delay for some random amount of time between input.
        var delta =  (Math.random() * (1.85) + wait);
        await pause(delta / 1000);
    }

    await pause(finalWait / 1000);
    poweroff();
    return;
}

/**
 * Convert a character that needs to be typed into something that can be shown on the screen.
 * Newlines becomes <br>
 * Tabs become three spaces.
 * Spaces become &nbsp;
 * */
function getChar(character) {
    let result;
    if (typeof character === "string") {
        if (character === "\n") {
            result = document.createElement("br");
        } else if (character === "\t") {
            let tab = document.createElement("span");
            tab.innerHTML = "&nbsp;&nbsp;&nbsp;";
            result = tab;
        } else if (character === " ") {
            let space = document.createElement("span");
            space.innerHTML = "&nbsp;";
            space.classList.add("terminal-NewLine");
            result = space;
        } else {
            let span = document.createElement("span");
            span.classList.add("character");
            span.textContent = character;
            result = span;
        }
    }
    return result;
}

/**
 * Slightly pauses execution.
 * */
export function pause(s = 1) {
    return new Promise(resolve => setTimeout(resolve, 1000 * Number(s)));
}

/**
 * Clear the terminal screen of text.
 * */
export function clear() {
    let terminal = document.querySelector(".terminal");
    terminal.innerHTML = "";
}

/**
 * Scrolls terminal window down.
 * */
function scroll(el = document.querySelector(".terminal")) {
    el.scrollTop = el.scrollHeight;
}

/**
 * "powers off" the crt monitor
 * */
async function poweroff() {
    if (loading) {
        document.querySelector("#crt").classList.add("poweroff");
        await pause(0.2);

        setNavBarStatus(true);

        // Remove the loader from view
        let loaderElement = document.querySelector(".loader");
        if (loaderElement) {
            loaderElement.style.visibility = "hidden";
        }
    }
    loading = false;
}

async function setNavBarStatus(status = false) {
    document.getElementById("navbarSupportedContent").style.visibility = (status ? "visible": "hidden");
}

export {type, poweroff};