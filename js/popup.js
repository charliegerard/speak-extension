const startButton = document.getElementsByClassName('activation-button')[0];
const stopButton = document.getElementsByClassName('deactivation-button')[0];
const languageSelect = document.getElementsByClassName('language-select')[0];
const errorMessage = document.getElementsByClassName('error-message')[0];

languageSelect.addEventListener('change', function (event) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: event.target.value}, function(response) {});
  });
});

startButton.addEventListener('click', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: "start"}, function(response) {});
  });
});

stopButton.addEventListener('click', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: "stop"}, function(response) {});
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.error){
    errorMessage.textContent = request.error
  }
});

