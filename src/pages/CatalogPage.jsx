import {
    useEffect,
    useState,
} from 'react';

import {
    useSearchParams,
} from 'react-router-dom';

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
        searchParams,
        setSearchParams,
    ] = useSearchParams();

    const categoryFromUrl =
        searchParams.get(
            'category'
        );

    const initialCategory =
        categories.includes(
            categoryFromUrl
        )
            ? categoryFromUrl
            : 'All';


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
    ] = useState(
        initialCategory
    );

    const [
        sortOption,
        setSortOption,
    ] = useState('newest');

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


    useEffect(() => {
        const category =
            searchParams.get(
                'category'
            );

        if (
            categories.includes(
                category
            )
        ) {
            setSelectedCategory(
                category
            );

            return;
        }

        setSelectedCategory(
            'All'
        );
    }, [
        searchParams,
    ]);


    function handleCategoryChange(
        category
    ) {
        setSelectedCategory(
            category
        );


        if (category === 'All') {
            setSearchParams({});

            return;
        }


        setSearchParams({
            category,
        });
    }


    function matchesSearch(
        place
    ) {
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


    function matchesCategory(
        place
    ) {
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


    function comparePlaces(
        firstPlace,
        secondPlace
    ) {
        if (
            sortOption === 'rating'
        ) {
            return (
                getAverageRating(
                    secondPlace
                )
                - getAverageRating(
                    firstPlace
                )
            );
        }


        return (
            new Date(
                secondPlace.created_at
            )
            - new Date(
                firstPlace.created_at
            )
        );
    }


    const filteredPlaces =
        places.filter(
            place =>
                matchesSearch(place)
                && matchesCategory(place)
        );


    const sortedPlaces = [
        ...filteredPlaces,
    ].sort(
        comparePlaces
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
                                        handleCategoryChange(
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


                <div className="sort-control">
                    <label htmlFor="sort">
                        Sort by
                    </label>

                    <select
                        id="sort"
                        value={sortOption}
                        onChange={
                            event =>
                                setSortOption(
                                    event.target.value
                                )
                        }
                    >
                        <option value="newest">
                            Newest
                        </option>

                        <option value="rating">
                            Top rated
                        </option>
                    </select>
                </div>


                <p className="results-count">
                    {sortedPlaces.length}
                    {' '}

                    {sortedPlaces.length === 1
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
                && sortedPlaces.length === 0
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
                {sortedPlaces.map(
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


function getAverageRating(
    place
) {
    const reviews =
        place.reviews ?? [];

    if (reviews.length === 0) {
        return 0;
    }


    const totalRating =
        reviews.reduce(
            (
                total,
                review
            ) =>
                total
                + review.rating,
            0
        );


    return (
        totalRating
        / reviews.length
    );
}


function getCategoryLabel(
    category
) {
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

