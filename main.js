
let done = false;
let tries = 0;
let t = setInterval(() => {
    for (const s of document.getElementsByTagName("span")) {
        if (s.innerHTML.toLowerCase() === "reject all") {
            s.click();
            done = true;
            break;
        }
    }
    tries++;
    if (!done) {
        for (const s of document.getElementsByTagName("button")) {
            if (
                s.innerHTML.toLowerCase().includes(">reject all<")
                || s.innerHTML.toLowerCase().includes(">hylkää kaikki<")
            ) {
                s.click();
                done = true;
                break;
            }
        }
    }
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
