import Link from 'next/link';

const Header = () => {
  return (
    <header className="header d-flex align-items-center sticky-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
          <img src="/assets/user/img/bg1.png" alt="Crop-Care Logo"/>
          <h1 className="sitename">Crop<span>-</span>Care</h1>
        </a>

        <nav className="navmenu">
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/register" style={ { color: '#087f47' } }>Register</Link></li>
            <Link href="/login" className="btn-get-started" style={ { color: '#e8f5e9' } }>Login</Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
