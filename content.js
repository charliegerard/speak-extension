var speechRecognitionStarted = false;

const startTracking = () => {
  if(!speechRecognitionStarted){
    console.log('in context?')
    // just place a div at top right
    var div = document.createElement('div');
    div.className.list = 'live-caption';

    setDivStyle(div);

    // var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-AU";

    recognition.onaudiostart = event => {
      console.log("starting")
    }

    recognition.onresult = event => {
      // do something with event.results
      console.log("result", event.results)
      let last = event.results.length - 1;
      let transcript = event.results[last][0].transcript;
      // let transcript = event.results[0][0].transcript;
      div.textContent = transcript;
      document.body.appendChild(div);
    }

    recognition.onerror = event => {
      console.log("error", event.error)
    }

    recognition.onspeechstart = event => {
      console.log("speech started")
    }

    recognition.onsoundend = event => {
      console.log("sound end")
    }

    recognition.onspeechend = event => {
      console.log("speech end")
      // recognition.stop()
    }

    recognition.onaudioend = event => {
      console.log("end")
      // recognition.start()
    }

    recognition.onstop = event => {
      console.log("stop");
    }

    recognition.start()

    speechRecognitionStarted = true
  }
}

const setDivStyle = div => {
  div.style.bottom = '10px';
  div.style.left = 0;
  div.style.textAlign = 'center';
  div.style.backgroundColor = 'rgba(0,0,0,0.8)';
  div.style.position = 'absolute';
  div.style.color = 'white';
  div.style.padding = '10px';
  div.style.fontSize = '16px';
  div.style.width = '50%';
  div.style.transform = 'translate(50%)';
  div.style.border = '2px solid white';
  div.style.borderRadius = "5px";
  div.style.zIndex= "10000";
  div.style.fontFamily = "Arial";
}

// startTracking();
