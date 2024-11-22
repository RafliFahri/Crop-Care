'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, X } from 'lucide-react'

const FloatingImageCard = ({ onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleCameraUse = () => {
    // Implement camera functionality here
    console.log("Camera button clicked")
  }

  return (
    (<div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <CardContent className="p-6">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-40 object-cover mb-4 rounded" />
          )}
          <h2 className="text-lg font-semibold text-center mb-4">
            Bagaimana Anda ingin mendeteksi tanaman Anda?
          </h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById('fileInput').click()}>
              <Upload className="mr-2 h-4 w-4" /> Upload Image
            </Button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload} />
            <Button variant="outline" className="w-full" onClick={handleCameraUse}>
              <Camera className="mr-2 h-4 w-4" /> Use Camera
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
}

export default FloatingImageCard

