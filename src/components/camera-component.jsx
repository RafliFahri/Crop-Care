/*import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';*/

/*const CameraComponent = ({ onClose, className }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isCameraOn]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing the camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      setImageSrc(dataURL);
    }
  };

  const handleClose = () => {
    console.log("camera closing");
    setIsCameraOn(false);
    onClose();
  };

  return (
    <div className="absolute z-30 top-0 left-0 w-full h-full bg-black opacity-50">

      {/!*{!isCameraOn && (*!/}
      {/!*  <Button onClick={() => setIsCameraOn(true)}>Start Camera</Button>*!/}
      {/!*)}*!/}
      {isCameraOn && (
        <div className="relative top-1/2 -translate-y-1/2">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"/>
          <Button onClick={handleClose} className="absolute z-0 right-4 top-4 p-3 rounded-full hover:bg-gray-100" aria-label="Close">
            <X className="h-4 w-4"/>
          </Button>
          <Button onClick={captureImage}>Capture Image</Button>
          <canvas ref={canvasRef} className="hidden"/>
          {imageSrc && (
            <img src={imageSrc} alt="Captured" className="mt-4 w-full h-40 object-cover rounded"/>
          )}
        </div>
      )}
    </div>
  );
};

export default CameraComponent;*/
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CameraIcon, X, Trash } from "lucide-react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";

const CameraComponent = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  // Function to stop the webcam
  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
      videoRef.current.srcObject = null;
      console.log(videoRef.current);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video stream
      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw video frame onto canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get image data URL from canvas
        const imageDataUrl = canvas.toDataURL("image/jpeg");

        // Set the captured image
        setCapturedImage(imageDataUrl);

        // Stop the webcam
        stopWebcam();

        // You can do something with the captured image here, like save it to state or send it to a server
      }
    }
  };

  // Function to reset state (clear media stream and refs)
  const resetState = () => {
    startWebcam(); // Stop the webcam if it's active
    setCapturedImage(null); // Reset captured image
  };
  const stopState = () => {
    stopWebcam(); // Stop the webcam if it's active
    setCapturedImage(null); // Reset captured image
    onClose();
  };

  const predictState = () => {
    // You can do something with the captured image here, like save it to state or send it to a server
  };
  return (
    <div className="fixed w-full bg-black">
      <div className="w-full min-h-screen border border-red-950 content-center">
      {capturedImage ? (
        <>
          <img src={capturedImage} className="w-full"/>
          <Button onClick={resetState} className="absolute top-8 right-8 p-3 rounded-full">
            <Trash/>
          </Button>
          <Button onClick={resetState} className="absolute bottom-8 right-1/2 translate-x-1/2">Predict</Button>
        </>
      ) : (
        <>
          <video className="w-full" ref={videoRef} autoPlay muted />
          <canvas className="hidden" ref={canvasRef} />
          <Button onClick={stopState} className="absolute top-8 right-8 p-3 rounded-full">
            <X/>
          </Button>
          <div className="absolute w-full min-h-32 border border-blue-800 bottom-0 bg-black bg-opacity-35 items-center justify-center flex">
            {!videoRef.current || !videoRef.current.srcObject ? (
              <Button onClick={startWebcam} className="rounded-full">
                nyaladogn
                {/*<CameraIcon/>*/}
              </Button>
            ) : (
              <Button onClick={captureImage} className="rounded-full">
                <CameraIcon/>
              </Button>
            )}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default CameraComponent;
