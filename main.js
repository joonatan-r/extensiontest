
const KEY = "skipperclickerData";

browser.runtime.onMessage.addListener(
  async function(request) {
    if (request.action === "clicked") {
        const value = (await browser.storage.local.get())[KEY];
        const d = document.createElement("div");
        d.style.position = "absolute";
        d.style.top = "100px";
        d.style.left = "100px";
        d.style.zIndex = 1000;
        const textInput = document.createElement("textarea");
        textInput.style.width = "500px";
        textInput.style.height = "500px";
        textInput.value = value || "";
        d.appendChild(textInput);
        const b = document.createElement("button");
        b.style.cursor = "pointer";
        b.style.backgroundColor = "#222";
        const p = document.createElement("p");
        p.innerHTML = "Save";
        p.style.padding = "10px";
        p.style.color = "#fff";
        b.appendChild(p)
        b.onclick = async () => {
            await browser.storage.local.set({ [KEY]: textInput.value });
            document.body.removeChild(d);
        };
        d.appendChild(b);
        document.body.appendChild(d);
    }
    return Promise.resolve({ status: "ok" });
  }
);

// hold auto clickable elements on page load in format like:
/*
    {
        "span": ["reject all"],
        "button": [">reject all<", ">hylkää kaikki<", ">necessary cookies only<"]
    }
*/

let options = {};

browser.storage.local.get().then((storedValue) => {
    if (storedValue[KEY]) {
    try {
        options = JSON.parse(storedValue[KEY]);
    } catch (e) {
        console.error(e);
    }
    }
});

let done = false;
let tries = 0;
let t = setInterval(() => {
    for (const key of Object.keys(options)) {
        for (const e of document.getElementsByTagName(key)) {
            if (options[key].some(i => e.innerHTML.toLowerCase().includes(i))) {
                e.click();
                done = true;
                break;
            }
        }
    }
    tries++;
    if (done || tries > 50) {
        clearInterval(t);
    }
}, 200);

let t2 = setInterval(() => {
    const skip = document.getElementsByClassName("ytp-skip-ad-button")[0];
    if (skip) {
        sendScreenMiddle(skip);
    }
}, 200);

let ads = false;
let t3 = setInterval(() => {
    const adsNew = document.getElementsByClassName("ytp-ad-button-icon").length > 0;
    if (ads && !adsNew) {
        document.getElementsByClassName("ytp-mute-button")[0]?.click();
    }
    if (!ads && adsNew) {
        document.getElementsByClassName("ytp-mute-button")[0]?.click();
    }
    ads = adsNew;
}, 100);

// disable fullscreen from double click, otherwise auto switches if skips 
let done4 = false;
let tries4 = 0;
let t4 = setInterval(() => {
    for (const v of document.getElementsByTagName("video")) {
        v.addEventListener("dblclick", e => {
            e.preventDefault();
            e.stopPropagation();
        });
        done4 = true;
    }
    tries4++;
    if (done4 || tries4 > 50) {
        clearInterval(t4);
    }
}, 200);

function sendScreenMiddle(element) {
    const rect = element.getBoundingClientRect();
    let x = Math.floor(window.screenX + rect.x + (rect.width / 2));
    // actually slightly off trying to account for top bar area, but close enough
    let y = Math.floor(window.screenY + (window.outerHeight - window.innerHeight) + rect.y + (rect.height / 2));
    console.log(`${x} ${y}`);
    // convert to Windows relative system
    x = Math.floor((x / window.screen.width) * 65535);
    y = Math.floor((y / window.screen.height) * 65535);
    if (x > 0 && y > 0) {
        browser.runtime.sendMessage({ coords: String(x).padStart(5, "0") + String(y).padStart(5, "0") }).then(console.log);
    }
}
