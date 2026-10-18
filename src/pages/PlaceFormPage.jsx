import { useParams } from 'react-router-dom';
import PageHeading from '../components/PageHeading.jsx';
import DevelopmentNotice from '../components/DevelopmentNotice.jsx';

export default function PlaceFormPage({ mode }) {
  const { placeId } = useParams();
  const isEdit = mode === 'edit';
  return (
    <div className="container inner-page narrow-page">
      <PageHeading eyebrow={isEdit ? 'EDIT PLACE' : 'SHARE A GOOD PLACE'} 
      title={isEdit ? 'Make an update.' : 'Add a new place.'} 
      description={isEdit ? `Editing record ${placeId}` : 'Help the community discover a place worth visiting.'} />
      <DevelopmentNotice title={isEdit ? 'Protected edit form planned for Day 4.' : 'Create form planned for Day 4.'}>
        Only signed-in users will be able to create records, and only a place author will be able to edit or delete that record. Supabase Row Level Security will enforce ownership.
      </DevelopmentNotice>
    </div>
  );
}
