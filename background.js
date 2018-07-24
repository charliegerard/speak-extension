// chrome.app.runtime.onLaunched.addListener(function() {
//   chrome.app.window.create('index.html', {
//     id: 'main',
//     bounds: { width: 620, height: 500 }
//   });
// });

// chrome.browserAction.onClicked.addListener(function(activeTab){
//   // var newURL = "";
//   chrome.tabs.create({ url: "index.html" });

// });

chrome.browserAction.onClicked.addListener(function (tab) {
	// for the current tab, inject the "inject.js" file & execute it
	chrome.tabs.executeScript(tab.ib, {
		file: 'content.js'
	});
});
