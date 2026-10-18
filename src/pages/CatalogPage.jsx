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


const categories = [
    'All',
    'Restaurant',
    'Cafe',
    'Bakery',
    'Bar',
];


export default function CatalogPage() {
    const [
        places,
        setPlaces,
    ] = useState([]);

    const [
        searchTerm,
        setSearchTerm,
    ] = useState('');

    const [
        selectedCategory,
        setSelectedCategory,
    ] = useState('All');

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


    function matchesSearch(place) {
        const normalizedSearch =
            searchTerm
                .trim()
                .toLowerCase();

        if (!normalizedSearch) {
            return true;
        }


        const searchableText = [
            place.name,
            place.city,
            place.address,
            place.description,
            place.category,
        ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();


        return searchableText.includes(
            normalizedSearch
        );
    }


    function matchesCategory(place) {
        if (
            selectedCategory === 'All'
        ) {
            return true;
        }

        return (
            place.category
            === selectedCategory
        );
    }


    const filteredPlaces =
        places.filter(
            place =>
                matchesSearch(place)
                && matchesCategory(place)
        );


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


            <div className="catalog-tools">
                <div className="search-box">
                    <span
                        className="search-icon"
                        aria-hidden="true"
                    >
                        ⌕
                    </span>

                    <input
                        type="search"
                        value={searchTerm}
                        onChange={
                            event =>
                                setSearchTerm(
                                    event.target.value
                                )
                        }
                        placeholder={
                            'Search places, '
                            + 'cities or food...'
                        }
                        aria-label="Search places"
                    />
                </div>


                <div className="category-filters">
                    {categories.map(
                        category => (
                            <button
                                key={category}
                                type="button"
                                className={
                                    selectedCategory
                                        === category
                                        ? (
                                            'filter-chip '
                                            + 'is-selected'
                                        )
                                        : 'filter-chip'
                                }
                                onClick={
                                    () =>
                                        setSelectedCategory(
                                            category
                                        )
                                }
                            >
                                {getCategoryLabel(
                                    category
                                )}
                            </button>
                        )
                    )}
                </div>


                <p className="results-count">
                    {filteredPlaces.length}
                    {' '}

                    {filteredPlaces.length === 1
                        ? 'place found'
                        : 'places found'}
                </p>
            </div>


            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}


            {!error
                && places.length === 0
                && (
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


            {!error
                && places.length > 0
                && filteredPlaces.length === 0
                && (
                    <div className="empty-state">
                        <h2>
                            No matches.
                        </h2>

                        <p>
                            Try another search
                            or category.
                        </p>
                    </div>
                )}


            <div className="places-grid">
                {filteredPlaces.map(
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


function getCategoryLabel(category) {
    if (category === 'Restaurant') {
        return 'Restaurants';
    }

    if (category === 'Cafe') {
        return 'Cafes';
    }

    if (category === 'Bakery') {
        return 'Bakeries';
    }

    if (category === 'Bar') {
        return 'Bars';
    }

    return 'All';
}

