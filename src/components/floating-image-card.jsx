'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import CameraComponent from "@/components/camera-component";

const FloatingImageCard = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCameraShow, setIsCameraShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setShowWarning(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraUse = () => {
    setIsCameraShow(true);
  };

  const handleCapture = (image) => {
    setSelectedImage(image);
    setIsCameraShow(false);
  };

  const handleDeteksi = async () => {
    if (!selectedImage) {
      setShowWarning(true);
    } else {
      // Convert image data URL to binary
      const imageBuffer = Buffer.from(selectedImage.split(",")[1], "base64");
      const formData = new FormData(); 
      formData.append("image", imageBuffer);
      formData.append("type", "cassava");
      try {
        let response = await fetch('/api', {
          method: 'POST',
          body: formData,
        });
        response = await response.json()
        // alert(`${response.name} ${response.age} ${response.city}`)
        console.log(response);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
      // try {
  
      //   // Call the prediction action
      //   const result = await fetch("api", {
      //     method: "POST",
      //     body: "formData",
      //   });
      //   // const result = await predictAction(imageBuffer, "cassava"); // Change to "maize" as needed
      //   setPredictionResult(result.message);
      // } catch (error) {
      //   console.error("Prediction failed:", error);
      //   setPredictionResult("Gagal memproses prediksi.");
      // } finally {
      //   setLoading(false);
      // }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <CardContent className="p-6">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-40 object-cover mb-4 rounded"
            />
          )}
          <h2 className="text-lg font-semibold text-center mb-4">
            Bagaimana Anda ingin mendeteksi tanaman Anda?
          </h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            <input
              id="fileInput"
              type="file"
              accept="image/jpg"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCameraUse}
            >
              <Camera className="mr-2 h-4 w-4" /> Use Camera
            </Button>
            <Button variant="default" className="w-full" onClick={handleDeteksi} type="submit">
              Prediksi
            </Button>
          </div>
          {showWarning && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Silakan unggah gambar terlebih dahulu.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      {isCameraShow && (
        <CameraComponent onClose={() => setIsCameraShow(false)} onCapture={handleCapture} />
      )}
    </div>
  );
};

export default FloatingImageCard;