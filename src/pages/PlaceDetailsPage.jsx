import { useParams, Link } from 'react-router-dom';
import PageHeading from '../components/PageHeading.jsx';
import DevelopmentNotice from '../components/DevelopmentNotice.jsx';

export default function PlaceDetailsPage() {
  const { placeId } = useParams();
  return (
    <div className="container inner-page">
      <PageHeading eyebrow="PLACE DETAILS" 
      title="A closer look." 
      description="Every place gets its own URL and information page." />
      <DevelopmentNotice title="Details data is coming on Day 3.">
        The route works with an ID parameter: /places/{placeId}. Later it will fetch the matching place from Supabase and show reviews, loading and error states.
      </DevelopmentNotice>
      <Link className="text-link" to="/places">← Back to all places</Link>
    </div>
  );
}
