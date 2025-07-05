
function onResponse(response) {
  console.log(`Received "${response}"`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function sendMessageToAllTabs(tabs) {
  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id, { action: "clicked" })
      .then(console.log)
      .catch(onError);
  }
}

browser.browserAction.onClicked.addListener(() => {
  browser.tabs
    .query({ currentWindow: true, active: true })
    .then(sendMessageToAllTabs)
    .catch(onError);
});

browser.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request);
    if (request.coords) {
      browser.runtime.sendNativeMessage("skipperclicker", request.coords).then(onResponse, onError);
    }
    sendResponse({ status: "ok" });
  }
);
