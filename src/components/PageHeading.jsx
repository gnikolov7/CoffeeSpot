export default function PageHeading({ eyebrow, title, description, children }) {
  return (
    <section className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="lead page-lead">{description}</p>}
      </div>
      {children}
    </section>
  );
}
