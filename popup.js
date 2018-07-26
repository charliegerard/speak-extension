document.addEventListener('DOMContentLoaded', function() {
  var startButton = document.getElementsByClassName('activation-button')[0];
  var stopButton = document.getElementsByClassName('deactivation-button')[0];

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
});
