import {
    useEffect,
    useState,
} from 'react';

import {
    Link,
} from 'react-router-dom';

import PageHeading
    from '../components/PageHeading.jsx';

import PlaceCard
    from '../components/PlaceCard.jsx';

import {
    useAuth,
} from '../hooks/useAuth.js';

import {
    getPlacesByOwner,
} from '../services/placeService.js';


export default function MyPlacesPage() {
    const {
        user,
    } = useAuth();

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


        async function loadMyPlaces() {
            try {
                const loadedPlaces =
                    await getPlacesByOwner(
                        user.id
                    );

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
                        'Could not load your places.'
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }


        loadMyPlaces();


        return () => {
            isActive = false;
        };
    }, [
        user.id,
    ]);


    if (isLoading) {
        return (
            <div
                className="
                    container
                    inner-page
                "
            >
                Loading your places...
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
                eyebrow="YOUR COLLECTION"
                title="My places."
                description={
                    'Manage the places '
                    + 'you have shared '
                    + 'with CoffeeSpot.'
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
                            Nothing here yet.
                        </h2>

                        <p>
                            Add your first place
                            to CoffeeSpot.
                        </p>

                        <Link
                            to="/places/new"
                            className="
                                button
                                button-dark
                            "
                        >
                            Add a place
                        </Link>
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
