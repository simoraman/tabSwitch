
document.addEventListener('DOMContentLoaded', function() {
  let btn = document.getElementById('doit');
  let intervalDiv = document.getElementById('interval-div');
  chrome.storage.local.get(['isStarted'], (result) => {
    setStatusText(result.isStarted);
    if (result.isStarted) {
      btn.innerText = 'stop';
      intervalDiv.className = "hidden";
    } else {
      btn.innerText = 'start';     
      intervalDiv.className = "";
    }
  });
  btn.onclick = function(element) {
    chrome.storage.local.get(['isStarted'], (result) => {
      setStatusText(!result.isStarted);
      if (result.isStarted) {
        chrome.storage.local.set({isStarted: false});  
        btn.innerText = 'start';           
        intervalDiv.className = "";
      } else {
        const interval = document.getElementById('interval').valueAsNumber * 1000;
        chrome.storage.local.set({isStarted: true, interval: interval});    
        btn.innerText = 'stop';           
        intervalDiv.className = "hidden";
      }
    });
  };
});

function setStatusText(isStarted) {
  let statusDiv = document.getElementById('status');
  statusDiv.textContent = isStarted ? "RUNNING" : " ";
}

