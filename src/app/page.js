'use client';
import {useEffect, useRef, useState} from "react";
import WebcamCapture from "@/components/CamCapture";

export default function Home() {
  /*const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  useEffect(() => {
    if (showCamera) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
        });
    }
  }, [showCamera]);*/



  return (
    <WebcamCapture/>
  );
  /*(
    <div className="container mx-auto p-4"><h1 className="text-2xl font-bold mb-4">Plant Disease Detection</h1>
      <div className="flex space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => document.getElementById('fileInput').click()}> Upload Image
        </button>
        <input id="fileInput" type="file" accept="image/!*" style={{display: 'none'}}
               onChange={(e) => console.log(e.target.files[0])}/>
        <button className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setShowCamera(!showCamera)}> {showCamera ? 'Close Camera' : 'Take Picture'} </button>
      </div>
      {showCamera && (<div className="mt-4">
        <video ref={videoRef} autoPlay className="w-full h-auto"/>
      </div>)} </div>);*/
}
