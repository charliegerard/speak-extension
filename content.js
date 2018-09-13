var recognition, div, languageSelected;

const init = () => {
  div = document.createElement('div');
  div.className = 'live-caption';

  setDivStyle(div);

  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = languageSelected || "en-US";

  recognition.onaudiostart = event => {
    console.log("starting")
  }

  recognition.onresult = event => {
    let last = event.results.length - 1;
    let lastTranscript = event.results[last][0].transcript;

    // div.textContent = lastTranscript;
    // document.body.appendChild(div);


    var interim_transcript = '';
    var final_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        // Verify if the recognized text is the last with the isFinal property
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }

    // Choose which result may be useful for you

    console.log("Interim: ", interim_transcript);

    console.log("Final: ",final_transcript);

    console.log("Simple: ", event.results[0][0].transcript);

  }

  recognition.onerror = event => {
    console.log("error", event.error)
    if(event.error === 'not-allowed'){
      const errorMessage = "AudioCapture permission has been blocked because of a Feature Policy applied to the current document. See https://goo.gl/EuHzyv for more details.";

      chrome.runtime.sendMessage({error: errorMessage}, function(response) {
        console.log(response.farewell);
      });
    }
  }

  recognition.onspeechstart = event => {
    console.log("speech started")
  }

  recognition.onsoundend = event => {
    console.log("sound end")
  }

  recognition.onspeechend = event => {
    stopTracking();
    console.log("speech end")
  }

  recognition.onaudioend = event => {
    console.log("end")
  }

  recognition.onstop = event => {
    stopTracking()
    console.log("stop");
  }
}

const startTracking = () => {
  console.log("start");
  recognition.start()
}

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
  console.log("tracking stopped");
  recognition.stop();
  if(document.body.contains(div)){
    document.body.removeChild(div);
  }
}

init();

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if(request.data === "start"){
    startTracking();
  } else if(request.data === "stop") {
    stopTracking();
  } else {
    languageSelected = request.data
  }
});
