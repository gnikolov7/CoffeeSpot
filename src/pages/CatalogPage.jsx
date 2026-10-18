import PageHeading from '../components/PageHeading.jsx';
import DevelopmentNotice from '../components/DevelopmentNotice.jsx';

export default function CatalogPage() {
  return (
    <div className="container inner-page">
      <PageHeading eyebrow="THE CITY IS YOUR MENU" 
      title="Explore places." 
      description="Restaurants, coffee shops, bakeries and bars worth discovering." />

      <div className="filters-demo" aria-label="Planned catalog filters">
        <span className="filter-chip is-selected">All places</span>
        <span className="filter-chip">Restaurants</span>
        <span className="filter-chip">Coffee shops</span>
        <span className="filter-chip">Bakeries</span>
        <span className="filter-chip">Bars</span>
      </div>
      
      <DevelopmentNotice title="The catalog will connect to Supabase on Day 3.">
        No restaurant records are hardcoded into this starter. The production version will load real, persistent records and handle loading, empty and error states.
      </DevelopmentNotice>
    </div>
  );
}
