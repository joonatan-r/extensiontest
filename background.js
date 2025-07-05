
function onResponse(response) {
  console.log(`Received "${response}"`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

browser.browserAction.onClicked.addListener(() => {
  console.log("Sending pingpingpongpong");
  let sending = browser.runtime.sendNativeMessage("skipperclicker", "pingpingpongpong");
  sending.then(onResponse, onError);
});

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    let sending = browser.runtime.sendNativeMessage("skipperclicker", request.coords);
    sending.then(onResponse, onError);
    sendResponse({ status: "ok" });
  }
);
