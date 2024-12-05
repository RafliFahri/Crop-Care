import React, { useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function About () {
  return (
    <>
      <Head>
        <title>Crop-Care</title>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link href="/assets/user/img/bg1.png" rel="icon"/>
        <link href="/assets/user/img/bg1.png" rel="apple-touch-icon"/>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap"
          rel="stylesheet"/>
        <link
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"/>
        <link href="/assets/user/css/main.css" rel="stylesheet"/>
      </Head>

      <header className="header d-flex align-items-center sticky-top">
        <div
          className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src="/assets/user/img/bg1.png" alt="Crop-Care"/>
            <h1 className="sitename">Crop<span>-</span>Care</h1>
          </a>
          <nav className="navmenu">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/register"
                     style={ { color: '#087f47' } }>Register</a></li>
              <a href="/login" className="btn-get-started"
                 style={ { color: '#e8f5e9' } }>Login</a>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main">
        <section id="starter-section" className="starter-section section">
          <div className="container section-title" data-aos="fade-up">
            <h2>About</h2>
            <div><span>About Of</span> <span
              className="description-title">Crop-Care</span></div>
          </div>
        </section>

        {/* About Section */ }
        <section id="about" className="about section">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-6 content" data-aos="fade-up"
                   data-aos-delay={ 100 }>
                <p className="who-we-are">Who We Are</p>
                <h3>Unleashing Potential with Creative Strategy</h3>
                <p style={ { textAlign: 'justify' } }>
                  Plant diseases pose a serious challenge to global food
                  security, often causing reduced crop yields and financial
                  losses for farmers. Traditional diagnosis, which relies on
                  expert visual inspection, is often slow and prone to errors.
                  <br/><br/>
                  Machine learning, especially deep learning, now offers a
                  solution by detecting patterns and symptoms of plant diseases
                  through extensive image datasets. This technology enables
                  farmers to monitor crops quickly and accurately, helping to
                  prevent outbreaks at an early stage. As a result, crop yields
                  can be improved, supporting global food security amid growing
                  challenges.
                </p>
              </div>
              <div className="col-lg-6 about-images" data-aos="fade-up"
                   data-aos-delay={ 200 }>
                <div className="row gy-4">
                  <div className="col-lg-6">
                    <img src="assets/user/img/about1.png" className="img-fluid"
                         alt/>
                  </div>
                  <div className="col-lg-6">
                    <div className="row gy-4">
                      <div className="col-lg-12">
                        <img src="assets/user/img/about2.png"
                             className="img-fluid" alt/>
                      </div>
                      <div className="col-lg-12">
                        <img src="assets/user/img/about3.png"
                             className="img-fluid" alt/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /About Section */ }

      </main>

      <footer id="footer" className="footer light-background">
        <div className="container">
          <div className="copyright text-center">
            <p>© <span>Copyright</span> <strong
              className="px-1 sitename">Crop-Care</strong> <span>All Rights Reserved</span>
            </p>
          </div>
        </div>
      </footer>

      <a href="#" id="scroll-top"
         className="scroll-top d-flex align-items-center justify-content-center"><i
        className="bi bi-arrow-up-short"></i></a>
    </>
  );
}
