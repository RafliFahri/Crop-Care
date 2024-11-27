import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const CameraComponent = ({ onClose, className }) => {
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

      {/*{!isCameraOn && (*/}
      {/*  <Button onClick={() => setIsCameraOn(true)}>Start Camera</Button>*/}
      {/*)}*/}
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

export default CameraComponent;
