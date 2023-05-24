import 'regenerator-runtime/runtime'
import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useState} from 'react'
import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function App() {

  const [value,setValue]= useState();

  const { transcript,
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

    startlistening = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  } else {
    // Fallback behaviour
  }

  const setEmpty=()=>{
    console.log(transcript);
    resetTranscript("");
  }

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div className='container-xxl'>
        <h2 className='mb-5'>Speech to text converter</h2>
          
        <div className="main-content" onClick={() =>  setValue(transcript)}>
                    {transcript}
                </div>


        <div className='m-2'>
          <button onClick={() => navigator.clipboard.writeText(transcript)} type="button" className='m-2 btn btn-dark'>copy to clipboard</button>
          <button onClick={startlistening} type="button" className='m-2 btn btn-dark'>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening} type="button" className='m-2 btn btn-dark'>Stop Listening</button>
          <button onClick={setEmpty} type="button" className='m-2 btn btn-dark'>Erase text</button>
        </div>
      
    </div>
  )
}
