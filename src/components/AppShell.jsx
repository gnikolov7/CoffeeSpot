import { Link, NavLink } from 'react-router-dom';

const navigation = [
  { to: '/places', label: 'Explore' },
  { to: '/my-places', label: 'My places' },
  { to: '/places/new', label: 'Add a place' },
];

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner container">
          <Link className="brand" to="/" aria-label="CoffeeSpot homepage">
            <span className="brand-symbol" aria-hidden="true">✳</span>
            <span>Coffee<span className="brand-accent">Spot</span><span className="brand-period">.</span></span>
          </Link>
          <nav className="nav-links" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="account-links">
            <Link className="login-link" to="/login">Log in</Link>
            <Link className="button button-dark button-sm" to="/register">Sign up <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div><strong>CoffeeSpot.</strong> <span>Good places, great stories.</span></div>
          <span>Built with React • A SoftUni exam project in progress</span>
        </div>
      </footer>
    </div>
  );
}
