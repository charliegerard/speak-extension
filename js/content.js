var recognition, div, languageSelected, isStopButtonClicked = false;

const init = () => {
  div = document.createElement('div');
  div.className = 'live-caption';

  setDivStyle(div);

  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = languageSelected || "en-US";

  recognition.onresult = event => {
    let last = event.results.length - 1;
    let lastTranscript = event.results[last][0].transcript;
    let interim_transcript = '';
    let final_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        // Verify if the recognized text is the last with the isFinal property
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    div.textContent = interim_transcript;
    document.body.appendChild(div);
  }

  recognition.onerror = event => {
    console.log("error", event.error)
    if(event.error === 'not-allowed'){
      const errorMessage = "AudioCapture permission has been blocked because of a Feature Policy applied to the current document. See https://goo.gl/EuHzyv for more details.";
      chrome.runtime.sendMessage({error: errorMessage})
      isStopButtonClicked = true;
      recognition.stop();
    }
  }

  recognition.onspeechstart = event => console.log("speech started");
  recognition.onspeechend = event => stopTracking();
  recognition.onend = function(event) {
    if (isStopButtonClicked) {
      stopTracking()
    } else {
      startTracking()
    }
  }
}

const startTracking = () => recognition.start();

const setDivStyle = div => {
  div.style.bottom = '10px';
  div.style.left = 0;
  div.style.textAlign = 'center';
  div.style.backgroundColor = 'rgba(0,0,0,0.8)';
  div.style.position = 'absolute';
  div.style.color = 'white';
  div.style.padding = '10px';
  div.style.fontSize = '30px';
  div.style.width = '50%';
  div.style.transform = 'translate(50%)';
  div.style.border = '2px solid white';
  div.style.borderRadius = "5px";
  div.style.zIndex= "10000";
  div.style.fontFamily = "Arial";
}

const stopTracking = () => {
  recognition.stop();
  if(document.body.contains(div)){
    document.body.removeChild(div);
  }
}

init();

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if(request.data === "start"){
    isStopButtonClicked = false
    startTracking();
  } else if(request.data === "stop") {
    isStopButtonClicked = true
    stopTracking();
  } else {
    languageSelected = request.data;
  }
});
