import { useState, useRef } from "react";

import {Button} from "@/components/ui/button";
import {CameraIcon, X} from "lucide-react";

const WebcamCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startWebcam = async () => {
    console.log(videoRef.current);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
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
  };

  const predictState = () => {
    // You can do something with the captured image here, like save it to state or send it to a server
  };
  return (
    <div className="relative w-full max-w-md mt-0 mb-0 ml-auto mr-auto bg-white">
      {capturedImage ? (
        <div className="w-full min-h-screen border border-red-950 content-center">
          <img src={capturedImage} className="w-full" />
          <Button onClick={resetState} className="absolute top-8 right-8 p-3 rounded-full">
            <X/>
          </Button>
          <Button onClick={resetState} className="absolute bottom-8 right-1/2 translate-x-1/2">Predict</Button>
        </div>
      ) : (
        <div className="w-full min-h-screen border border-red-950 content-center">
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
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;