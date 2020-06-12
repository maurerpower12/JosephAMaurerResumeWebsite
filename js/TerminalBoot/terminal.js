/* Derived from https://tlijm.csb.app with heavy modifications */

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
        // True creates a new div to type in.
        useContainer = false
    } = {},
    container = document.querySelector(".terminal")
) {
    let typerDiv = useContainer ? container : document.createElement("div");
    typerDiv.classList.add("typer", "active");
    if (!useContainer) {
        container.appendChild(typerDiv);
    }

    if (initialWait) {
        await pause(initialWait / 1000);
    }

    if (Array.isArray(text)) {
        text = text.join("\n");
    }
    let queue = text.split("");

    while (queue.length) {
        let char = queue.shift();
        // Get the element in html form.
        let element = getChar(char);
        if (element) {
            typerDiv.appendChild(element);
        }
        scroll(container);
        var delta =  (Math.random() * (1.85) + wait);
        await pause(delta / 1000);
    }

    await pause(finalWait / 1000);
    document.querySelector("#crt").classList.add("poweroff");
    await pause(0.2);
    document.querySelector(".loader").remove();
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

export {type};