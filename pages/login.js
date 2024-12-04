// pages/login.js
import React, { useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  return (
    <>
      <Head>
        <title>Crop-Care</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="/assets/user/img/bg1.png" rel="icon" />
        <link href="/assets/user/img/bg1.png" rel="apple-touch-icon" />
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="/assets/login/css/style.css" rel="stylesheet" />
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

      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div className="wrap d-md-flex">
                <div className="img" style={{ backgroundImage: "url('/assets/login/images/bg-1.jpg')" }}></div>
                <div className="login-wrap p-4 p-md-5">
                  <div className="d-flex">
                    <div className="w-100">
                      <h3 className="mb-4">Sign In</h3>
                    </div>
                  </div>
                  <form className="signin-form">
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="name">Username</label>
                      <input type="text" className="form-control" placeholder="Username" required />
                    </div>
                    <div className="form-group mb-3">
                      <label className="label" htmlFor="password">Password</label>
                      <input type="password" className="form-control" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                      <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                    </div>
                    <div className="form-group d-md-flex">
                      <div className="w-50 text-left">
                        <label className="checkbox-wrap checkbox-primary mb-0">Remember Me
                          <input type="checkbox" checked />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="w-50 text-md-right">
                        <a href="#">Forgot Password</a>
                      </div>
                    </div>
                  </form>
                  <p className="text-center">
                    Not a member? <a href="/signup">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer light-background">
        <div className="container">
          <div className="copyright text-center">
            <p>© <span>Copyright</span> <strong className="px-1 sitename">Crop-Care</strong> <span>All Rights Reserved</span></p>
          </div>
        </div>
      </footer>

      {/* Scripts */}
      <script src="/assets/login/js/jquery.min.js"></script>
      <script src="/assets/login/js/popper.js"></script>
      <script src="/assets/login/js/bootstrap.min.js"></script>
      <script src="/assets/login/js/main.js"></script>
    </>
  );
};

export default Login;
