import { useState } from 'react';

const Hero = () => {
  const [isScanVisible, setIsScanVisible] = useState(false);
  const [videoStream, setVideoStream] = useState(null);

  const startScan = () => {
    setIsScanVisible(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setVideoStream(stream);
      }).catch((error) => {
        console.error("Failed to access camera:", error);
      });
  };

  const stopScan = () => {
    if (videoStream) {
      videoStream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    }
    setIsScanVisible(false);
  };

  return (
    <section id="hero" className="hero section light-background">
      <div className="container position-relative">
        <div className="row gy-5">
          <div className="col-lg-6">
            <h2>Crop-Care</h2>
            <p>An AI-based plant disease detection application...</p>
          </div>
          <div className="col-lg-6">
            <img src="/assets/user/img/bg1.png" className="img-fluid" alt="Plant" />
          </div>
        </div>
        <div className="icon-boxes">
          <div className="row gy-4 mt-3">
            <div className="col-xl-3 col-md-6">
              <div className="icon-box">
                <div className="icon">
                  <i className="bi bi-camera"></i>
                </div>
                <h4 className="title">
                  <a href="#" className="stretched-link" onClick={startScan}>Scan</a>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isScanVisible && (
        <div>
          <video id="videoPreview" width="100%" height="300" autoPlay playsInline />
          <button onClick={stopScan}>Close Camera</button>
          <button onClick={() => alert('Prediction clicked')}>Prediksi</button>
        </div>
      )}
    </section>
  );
};

export default Hero;
