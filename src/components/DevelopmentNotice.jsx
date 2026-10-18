export default function DevelopmentNotice({ title, children }) {
  return (
    <div className="notice" role="status">
      <span className="notice-icon" aria-hidden="true">◌</span>
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}
