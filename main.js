
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
    if (done || tries > 50) {
        clearInterval(t);
    }
}, 200);

let done2 = false;
let tries2 = 0;
let t2 = setInterval(() => {
    for (const s of document.getElementsByTagName("button")) {
        if (s.innerHTML.toLowerCase().includes(">skip<")) {
            sendScreenMiddle(s);
            done2 = true;
            break;
        }
    }
    tries2++;
    // if (done2) {
    //     clearInterval(t2);
    // }
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

// const button = document.createElement("button");
// button.innerHTML = "test";
// button.onclick = async () => {
//     console.log("clicked");
//     const response = await browser.runtime.sendMessage({ greeting: "hello" });
//     console.log(response);
// };
// document.body.appendChild(button);
