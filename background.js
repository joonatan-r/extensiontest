
function onResponse(response) {
  console.log(`Received "${response}"`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(() => {
  console.log("Sending pingpingpongpong");
  let sending = browser.runtime.sendNativeMessage("extensiontest", "pingpingpongpong");
  sending.then(onResponse, onError);
});

// var port = browser.runtime.connectNative("extensiontest");

// port.onMessage.addListener((response) => {
//   console.log("Received: " + response);
// });

// browser.browserAction.onClicked.addListener(() => {
//   console.log("Sending:  ping");
//   port.postMessage("ping");
// });

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    let sending = browser.runtime.sendNativeMessage("extensiontest", request.coords);
    sending.then(onResponse, onError);
    sendResponse({ status: "ok" });
  }
);
