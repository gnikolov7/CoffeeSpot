import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container not-found">
      <p className="eyebrow">404 — NOT FOUND</p>
      <h1>Lost your way?</h1>
      <p>That page isn't on our menu.</p>
      <Link className="button button-dark" to="/">Back home ↗</Link>
    </div>
  );
}
