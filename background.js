chrome.runtime.onInstalled.addListener(function() {
  console.log("install");
  chrome.storage.local.set({isStarted: false, interval: 5000});
  runStartChecker(5000);
});

function runStartChecker(interval) {
  window.setTimeout(checkIfStarted, interval);  
}

function checkIfStarted() {
  chrome.storage.local.get(['isStarted', 'interval'], function(result) {
    console.log(result);
    if (result.isStarted === true) {
      changeTab();
    }
    let interval = result.interval;
    if (isNaN(interval)) {
      interval = 5000;
    }
    console.log(interval);
    runStartChecker(interval);
  });
}

function changeTab() {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    let activeTab = tabs.find(tab => tab.active);
    if (activeTab.index + 1 >= tabs.length) {
      chrome.tabs.highlight({ tabs: 0 });
    }
    else {
      chrome.tabs.highlight({ tabs: activeTab.index + 1 });
    }
  });
}
