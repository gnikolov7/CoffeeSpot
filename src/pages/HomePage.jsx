import { Link } from 'react-router-dom';

const categories = [
  { number: '01', label: 'Restaurants', accent: 'olive', symbol: '✳' },
  { number: '02', label: 'Coffee shops', accent: 'beige', symbol: '☕' },
  { number: '03', label: 'Bakeries', accent: 'peach', symbol: '◒' },
  { number: '04', label: 'Bars', accent: 'blue', symbol: '✦' },
];

export default function HomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <div className="hero-label"><span className="status-dot" /> FOR THE LOVE OF GOOD PLACES</div>
          <h1>Your next <em>favorite</em><br />place is out<br />there<span className="heading-dot">.</span></h1>
          <p className="lead">Find memorable restaurants, coffee shops, bakeries, and bars. Discover great menus and share the places worth talking about.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/places">Explore places <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" to="/register">Join the community <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-footnote">SOFIA FIRST. EVERYWHERE NEXT. <span>✳</span></div>
        </div>
        <div className="hero-art" aria-label="Illustrated restaurant discovery concept">
          <div className="art-sun" />
          <div className="art-orbit art-orbit-one" />
          <div className="art-orbit art-orbit-two" />
          <div className="art-middle">
            <div className="art-title">EAT<br/>WELL<span>.</span></div>
            <div className="art-subtitle">A CITY FULL OF FLAVOR</div>
          </div>
          <div className="art-sticker art-sticker-top">THE LOCAL<br/>GOOD STUFF ↗</div>
          <div className="art-sticker art-sticker-bottom">GOOD<br/>TASTE<br/>LIVES<br/>HERE ✳</div>
          <span className="art-star art-star-one">✳</span>
          <span className="art-star art-star-two">✦</span>
          <div className="art-bottom">COFFEESPOT — CURATED BY PEOPLE, NOT ALGORITHMS</div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EVERY CRAVING HAS A PLACE</p>
              <h2>What are you in the mood for?</h2>
              <p>Find the perfect spot for your next meal or coffee break.</p>
            </div>
            <Link className="text-link" to="/places">Browse all places ↗</Link>
          </div>
          <div className="category-grid">
            {categories.map(({ number, label, accent, symbol }) => (
              <Link key={label} to="/places" className={`category-card category-${accent}`}>
                <span className="category-number">{number} / EXPLORE</span>
                <span className="category-symbol" aria-hidden="true">{symbol}</span>
                <span className="category-bottom"><strong>{label}</strong><span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="join-section container">
        <div className="join-copy">
          <p className="eyebrow">YOUR CITY. YOUR PICKS.</p>
          <h2>Know a spot we should know?</h2>
          <p>Help people discover somewhere wonderful. Add a place, leave a review, or save it for later as we grow.</p></div>
        <Link className="button button-light" to="/places/new">Add a place ↗</Link>
      </section>
    </>
  );
}
