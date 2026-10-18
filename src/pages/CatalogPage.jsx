import {
    useEffect,
    useState,
} from 'react';

import PageHeading
    from '../components/PageHeading.jsx';

import PlaceCard
    from '../components/PlaceCard.jsx';

import {
    getAllPlaces,
} from '../services/placeService.js';


export default function CatalogPage() {
    const [
        places,
        setPlaces,
    ] = useState([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState('');


    useEffect(() => {
        let isActive = true;


        async function loadPlaces() {
            try {
                const loadedPlaces =
                    await getAllPlaces();

                if (isActive) {
                    setPlaces(
                        loadedPlaces
                    );
                }
            } catch (loadError) {
                console.error(
                    loadError
                );

                if (isActive) {
                    setError(
                        'Could not load places.'
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }


        loadPlaces();


        return () => {
            isActive = false;
        };
    }, []);


    if (isLoading) {
        return (
            <div
                className="
                    container
                    inner-page
                "
            >
                Loading places...
            </div>
        );
    }


    return (
        <div
            className="
                container
                inner-page
            "
        >
            <PageHeading
                eyebrow="EXPLORE"
                title="Find your next spot."
                description={
                    'Restaurants, cafés, '
                    + 'bakeries and bars '
                    + 'worth discovering.'
                }
            />


            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}


            {!error &&
                places.length === 0 && (
                    <div className="empty-state">
                        <h2>
                            No places yet.
                        </h2>

                        <p>
                            Be the first person
                            to add one.
                        </p>
                    </div>
                )}


            <div className="places-grid">
                {places.map(
                    place => (
                        <PlaceCard
                            key={place.id}
                            place={place}
                        />
                    )
                )}
            </div>
        </div>
    );
}
