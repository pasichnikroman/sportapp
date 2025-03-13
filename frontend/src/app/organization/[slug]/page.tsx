export default function OrganizationPage({ params }) {
  return (
    <div>
      <h1>Slug: {params.slug}</h1>
      <p>This is a test page for {params.slug}.</p>
    </div>
  );
}
