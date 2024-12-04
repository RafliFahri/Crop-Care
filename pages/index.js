// pages/index.js

import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePrediction, setImagePrediction] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (showVideo) {
      // Memulai kamera
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream; // Menyimpan referensi stream
          }
        })
        .catch((err) => {
          console.error("Error accessing webcam: ", err);
        });
    } else {
      // Menutup kamera saat stop scan
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop()); // Menyetop semua track
        streamRef.current = null; // Reset referensi stream
        
        // Cek jika videoRef.current ada sebelum mengubah srcObject
        if (videoRef.current) {
          videoRef.current.srcObject = null; // Reset srcObject
        }
      }
    }
  }, [showVideo]);

  const startScan = () => {
    setShowVideo(true);
  };

  const stopScan = () => {
    setShowVideo(false);
  };

  const predictDisease = () => {
    const diseases = ['Penyakit A', 'Penyakit B', 'Penyakit C', 'Sehat'];
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    setPrediction(`Hasil analisis menunjukkan kemungkinan: ${randomDisease}`);
  };

  const triggerFileUpload = () => {
    document.getElementById('imageInput').click();
  };

  const previewImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const predictImage = () => {
    const predictions = ['Penyakit Kulit', 'Luka Ringan', 'Infeksi', 'Sehat'];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    setImagePrediction(`Hasil analisis menunjukkan kemungkinan: ${randomPrediction}`);
  };

  const closePredictionResult = () => {
    setPrediction(null);
  };

  const closeImagePredictionResult = () => {
    setImagePrediction(null);
  };

  // Menambahkan fungsi untuk menutup preview gambar
  const closeImagePreview = () => {
    setImagePreview(null); // Reset preview gambar
  };

  return (
    <>
      <Head>
        <title>Crop-Care</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="/assets/user/img/bg1.png" rel="icon" />
        <link href="/assets/user/img/bg1.png" rel="apple-touch-icon" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/assets/user/css/main.css" rel="stylesheet" />
      </Head>

      <header className="header d-flex align-items-center sticky-top">
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src="/assets/user/img/bg1.png" alt="Crop-Care" />
            <h1 className="sitename">Crop<span>-</span>Care</h1>
          </a>
          <nav className="navmenu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/register" style={{ color: '#087f47' }}>Register</a></li>
              <a href="/login" className="btn-get-started" style={{ color: '#e8f5e9' }}>Login</a>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="hero" className="hero section light-background">
          <div className="container position-relative">
            <div className="row gy-5">
              <div className="col-lg-6 d-flex flex-column justify-content-center">
                <h2>Crop-Care</h2>
                <p>An AI-based plant disease detection application that helps farmers identify diseases quickly and accurately through leaf images, supporting early prevention and increasing crop yields.</p>
              </div>
              <div className="col-lg-6">
                <img src="/assets/user/img/bg1.png" className="img-fluid" alt="Crop-Care" />
              </div>
            </div>
          </div>

          <div className="icon-boxes position-relative">
            <div className="container position-relative">
              <div className="row gy-4 mt-3" style={{ justifyContent: 'center' }}>

                {/* Scan Icon Box */}
                <div className="col-xl-3 col-md-6">
                  <div className="icon-box">
                    <div className="icon"><i className="bi bi-camera"></i></div>
                    <h4 className="title">
                      <a href="#" onClick={startScan}>Scan</a>
                    </h4>
                  </div>
                </div>

                {/* Video Element */}
                {showVideo && (
                  <>
                    <video ref={videoRef} width="100%" height="300" autoPlay playsInline style={{ border: '2px solid #ccc' }}></video>
                    <button onClick={stopScan} style={{ display: 'block' }}>Close Camera</button>
                    <button onClick={predictDisease} style={{ display: 'block' }}>Prediksi</button>
                  </>
                )}

                {/* Prediction Result */}
                {prediction && (
                  <div id="predictionResult" style={{ marginTop: '20px', border: '2px solid #4CAF50', padding: '10px', backgroundColor: '#e8f5e9' }}>
                    <h4>Hasil Prediksi:</h4>
                    <p>{prediction}</p>
                    <span onClick={closePredictionResult} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                      <i className="bi bi-x-circle" style={{ fontSize: '24px', color: '#ff0000' }}></i>
                    </span>
                  </div>
                )}

                {/* Upload Image Icon Box */}
                <div className="col-xl-3 col-md-6">
                  <div className="icon-box">
                    <div className="icon"><i className="bi bi-card-image"></i></div>
                    <h4 className="title">
                      <a href="#" onClick={triggerFileUpload}>Upload Image</a>
                    </h4>
                  </div>
                </div>

                {/* File Input and Image Preview */}
                <input type="file" id="imageInput" accept="image/*" style={{ display: 'none' }} onChange={previewImage} />
                {imagePreview && (
                  <div id="imageContainer" style={{ display: 'block', position: 'relative', maxWidth: '100%', marginTop: '20px', border: '2px solid #ccc' }}>
                    <img id="imagePreview" src={imagePreview} style={{ width: '100%' }} />
                    <span onClick={closeImagePreview} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                      <i className="bi bi-x-circle" style={{ fontSize: '24px', color: '#ff0000' }}></i>
                    </span>
                  </div>
                )}
                <button onClick={predictImage} style={{ display: imagePreview ? 'block' : 'none' }}>Prediksi</button>

                {/* Image Prediction Result */}
                {imagePrediction && (
                  <div id="imagePredictionResult" style={{ marginTop: '20px', border: '2px solid #4CAF50', padding: '10px', backgroundColor: '#e8f5e9' }}>
                    <h4>Hasil Prediksi:</h4>
                    <p>{imagePrediction}</p>
                    <span onClick={closeImagePredictionResult} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                      <i className="bi bi-x-circle" style={{ fontSize: '24px', color: '#ff0000' }}></i>
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        </section>

       <section id="about" className="about section">
  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay={100}>
        <p className="who-we-are">Who We Are</p>
        <h3>Unleashing Potential with Creative Strategy</h3>
        <p style={{textAlign: 'justify'}}>
          Plant diseases pose a serious challenge to global food security, often causing reduced crop yields and financial losses for farmers. Traditional diagnosis, which relies on expert visual inspection, is often slow and prone to errors.  
          <br /><br />
          Machine learning, especially deep learning, now offers a solution by detecting patterns and symptoms of plant diseases through extensive image datasets. This technology enables farmers to monitor crops quickly and accurately, helping to prevent outbreaks at an early stage. As a result, crop yields can be improved, supporting global food security amid growing challenges.
        </p>
        <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right" /></a>
      </div>
      <div className="col-lg-6 about-images" data-aos="fade-up" data-aos-delay={200}>
        <div className="row gy-4">
          <div className="col-lg-6">
            <img src="assets/user/img/about1.png" className="img-fluid" alt />
          </div>
          <div className="col-lg-6">
            <div className="row gy-4">
              <div className="col-lg-12">
                <img src="assets/user/img/about2.png" className="img-fluid" alt />
              </div>
              <div className="col-lg-12">
                <img src="assets/user/img/about3.png" className="img-fluid" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Features Section */}
<section id="features" className="features section light-background">
  {/* Section Title */}
  <div className="container section-title" data-aos="fade-up">
    <h2>Features</h2>
    <div><span>Check Our</span> <span className="description-title">Features</span></div>
  </div>{/* End Section Title */}
  <div className="container">
    <div className="row gy-5 justify-content-between">
      <div className="col-xl-5" data-aos="zoom-out" data-aos-delay={100}>
        <img src="assets/user/img/features.png" className="img-fluid" alt />
      </div>
      <div className="col-xl-6 d-flex">
        <div className="row align-self-center gy-4">
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={200}>
            <div className="feature-box d-flex align-items-center">
              <i className="bi bi-check" />
              <h3>increase in crop yields</h3>
            </div>
          </div>{/* End Feature Item */}
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={300}>
            <div className="feature-box d-flex align-items-center">
              <i className="bi bi-check" />
              <h3>early detection</h3>
            </div>
          </div>{/* End Feature Item */}
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={400}>
            <div className="feature-box d-flex align-items-center">
              <i className="bi bi-check" />
              <h3>epidemic prevention</h3>
            </div>
          </div>{/* End Feature Item */}
          <div className="col-md-6" data-aos="fade-up" data-aos-delay={500}>
            <div className="feature-box d-flex align-items-center">
              <i className="bi bi-check" />
              <h3>support for global food security</h3>
            </div>
          </div>{/* End Feature Item */}
        </div>
      </div>
    </div>
  </div>
</section>{/* /Features Section */}

{/* Faq Section */}
<section id="faq" className="faq section">
  <div className="container">
    <div className="row gy-4">
      <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100}>
        <div className="content px-xl-5">
          <h3><span>Frequently Asked </span><strong>Questions</strong></h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
          </p>
        </div>
      </div>
      <div className="col-lg-8" data-aos="fade-up" data-aos-delay={200}>
        <div className="faq-container">
          <div className="faq-item faq-active">
            <h3><span className="num">1.</span> <span>Non consectetur a erat nam at lectus urna duis?</span></h3>
            <div className="faq-content">
              <p>Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>{/* End Faq item*/}
          <div className="faq-item faq-active">
            <h3><span className="num">2.</span> <span>Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?</span></h3>
            <div className="faq-content">
              <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>{/* End Faq item*/}
          <div className="faq-item faq-active">
            <h3><span className="num">3.</span> <span>Dolor sit amet consectetur adipiscing elit pellentesque?</span></h3>
            <div className="faq-content">
              <p>Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>{/* End Faq item*/}
          <div className="faq-item faq-active">
            <h3><span className="num">4.</span> <span>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</span></h3>
            <div className="faq-content">
              <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>{/* End Faq item*/}
          <div className="faq-item faq-active">
            <h3><span className="num">5.</span> <span>Tempus quam pellentesque nec nam aliquam sem et tortor consequat?</span></h3>
            <div className="faq-content">
              <p>Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in</p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>{/* End Faq item*/}
        </div>
      </div>
    </div>
  </div>
</section>{/* /Faq Section */}



      </main>

      <div>
  <footer id="footer" className="footer light-background">
    <div className="container">
      <div className="copyright text-center ">
        <p>© <span>Copyright</span> <strong className="px-1 sitename">Crop-Care</strong> <span>All Rights Reserved</span></p>
      </div>
    </div>
  </footer>
  {/* Scroll Top */}
  <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
</div>

    </>
  );
}
