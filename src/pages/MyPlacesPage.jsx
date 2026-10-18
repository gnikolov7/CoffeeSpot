import PageHeading from '../components/PageHeading.jsx';
import DevelopmentNotice from '../components/DevelopmentNotice.jsx';

export default function MyPlacesPage() {
  return (
    <div className="container inner-page">
      <PageHeading eyebrow="YOUR CONTRIBUTIONS" 
      title="My places." 
      description="Manage the places you have shared with the community." />
      <DevelopmentNotice title="Private dashboard planned for Day 4.">
        This page will become a protected route and only show records created by the signed-in user.
      </DevelopmentNotice>
    </div>
  );
}
