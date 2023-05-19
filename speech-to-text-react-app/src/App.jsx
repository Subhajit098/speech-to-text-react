import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function App() {

  const {transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening
  } = useSpeechRecognition()

  let startlistening = null;

  if (browserSupportsContinuousListening) {

     startlistening = ()=> SpeechRecognition.startListening({ continuous: true , language : "en-IN"});
  } else {
    // Fallback behaviour
  }


  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className='container'>
    <div className=''>
      <h2>Speech to text converter</h2>

      <div className='main-content'>
      
      <b-form-textarea
        id="textarea-rows"
    placeholder="Tall textarea"
    rows="8"
      >{transcript}</b-form-textarea>
   
        
      </div>

      <div className='btn-style'>
        <button onClick={() =>  navigator.clipboard.writeText(transcript)} className='m-3'>copy to clipboard</button>
        <button onClick={startlistening} className='m-2'>Start Listening</button>
        <button onClick={SpeechRecognition.stopListening} className='m-2'>Stop Listening</button>
      </div>
      </div>
    </div>
  )
}
