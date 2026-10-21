import {
    useEffect,
    useState,
} from 'react';

import {
    Link,
} from 'react-router-dom';

import PlaceCard
    from '../components/PlaceCard.jsx';

import {
    getAllPlaces,
} from '../services/placeService.js';

import {
    useAuth,
} from '../hooks/useAuth.js';


const categories = [
    {
        number: '01',
        label: 'Restaurants',
        accent: 'olive',
        symbol: '✳',
        value: 'Restaurant',
    },
    {
        number: '02',
        label: 'Coffee shops',
        accent: 'beige',
        symbol: '☕',
        value: 'Cafe',
    },
    {
        number: '03',
        label: 'Bakeries',
        accent: 'peach',
        symbol: '◒',
        value: 'Bakery',
    },
    {
        number: '04',
        label: 'Bars',
        accent: 'blue',
        symbol: '✦',
        value: 'Bar',
    },
];


export default function HomePage() {
    const {
        user,
    } = useAuth();

    const [
        featuredPlaces,
        setFeaturedPlaces,
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


        async function loadFeaturedPlaces() {
            try {
                const places =
                    await getAllPlaces();

                const selectedPlaces =
                    getFeaturedPlaces(
                        places
                    );

                if (isActive) {
                    setFeaturedPlaces(
                        selectedPlaces
                    );
                }
            } catch (loadError) {
                console.error(
                    loadError
                );

                if (isActive) {
                    setError(
                        'Could not load featured places.'
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }


        loadFeaturedPlaces();


        return () => {
            isActive = false;
        };
    }, []);


    return (
        <>
            <section className="hero container">
                <div className="hero-copy">
                    <div className="hero-label">
                        <span className="status-dot" />

                        FOR THE LOVE OF GOOD PLACES
                    </div>


                    <h1>
                        Your next

                        {' '}

                        <em>
                            favorite
                        </em>

                        <br />

                        place is out

                        <br />

                        there

                        <span className="heading-dot">
                            .
                        </span>
                    </h1>


                    <p className="lead">
                        Find memorable restaurants,
                        coffee shops, bakeries,
                        and bars.

                        {' '}

                        Discover great menus
                        and share the places
                        worth talking about.
                    </p>


                    <div className="hero-actions">
                        <Link
                            className="
                                button
                                button-dark
                            "
                            to="/places"
                        >
                            Explore places

                            <span aria-hidden="true">
                                ↗
                            </span>
                        </Link>


                        <Link
                            className="text-link"
                            to={
                                user
                                    ? '/my-places'
                                    : '/register'
                            }
                        >
                            {user
                                ? 'My places'
                                : 'Join the community'}

                            <span aria-hidden="true">
                                →
                            </span>
                        </Link>
                    </div>


                    <div className="hero-footnote">
                        SOFIA FIRST.
                        EVERYWHERE NEXT.

                        <span>
                            ✳
                        </span>
                    </div>
                </div>


                <div
                    className="hero-art"
                    aria-label={
                        'Illustrated restaurant '
                        + 'discovery concept'
                    }
                >
                    <div className="art-sun" />

                    <div
                        className="
                            art-orbit
                            art-orbit-one
                        "
                    />

                    <div
                        className="
                            art-orbit
                            art-orbit-two
                        "
                    />


                    <div className="art-middle">
                        <div className="art-title">
                            EAT

                            <br />

                            WELL

                            <span>
                                .
                            </span>
                        </div>

                        <div className="art-subtitle">
                            A CITY FULL OF FLAVOR
                        </div>
                    </div>


                    <div
                        className="
                            art-sticker
                            art-sticker-top
                        "
                    >
                        THE LOCAL

                        <br />

                        GOOD STUFF ↗
                    </div>


                    <div
                        className="
                            art-sticker
                            art-sticker-bottom
                        "
                    >
                        GOOD

                        <br />

                        TASTE

                        <br />

                        LIVES

                        <br />

                        HERE ✳
                    </div>


                    <span
                        className="
                            art-star
                            art-star-one
                        "
                    >
                        ✳
                    </span>

                    <span
                        className="
                            art-star
                            art-star-two
                        "
                    >
                        ✦
                    </span>


                    <div className="art-bottom">
                        COFFEESPOT —
                        CURATED BY PEOPLE,
                        NOT ALGORITHMS
                    </div>
                </div>
            </section>


            <section className="categories-section">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                EVERY CRAVING
                                HAS A PLACE
                            </p>

                            <h2>
                                What are you
                                in the mood for?
                            </h2>
                        </div>

                        <Link
                            className="text-link"
                            to="/places"
                        >
                            Browse all places ↗
                        </Link>
                    </div>


                    <div className="category-grid">
                        {categories.map(
                            category => (
                                <Link
                                    key={
                                        category.label
                                    }
                                    to={
                                        '/places?category='
                                        + category.value
                                    }
                                    className={
                                        'category-card '
                                        + `category-${category.accent}`
                                    }
                                >
                                    <span className="category-number">
                                        {category.number}
                                        {' / '}
                                        EXPLORE
                                    </span>

                                    <span
                                        className="category-symbol"
                                        aria-hidden="true"
                                    >
                                        {category.symbol}
                                    </span>

                                    <span className="category-bottom">
                                        <strong>
                                            {category.label}
                                        </strong>

                                        <span aria-hidden="true">
                                            ↗
                                        </span>
                                    </span>
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </section>


            <section className="featured-section">
                <div className="container">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">
                                COMMUNITY FAVORITES
                            </p>

                            <h2>
                                Places worth
                                knowing about.
                            </h2>
                        </div>

                        <Link
                            className="text-link"
                            to="/places"
                        >
                            Explore everything ↗
                        </Link>
                    </div>


                    {isLoading && (
                        <div className="featured-message">
                            Finding good places...
                        </div>
                    )}


                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}


                    {!isLoading
                        && !error
                        && featuredPlaces.length === 0
                        && (
                            <div className="empty-state">
                                <h3>
                                    The list is just starting.
                                </h3>

                                <p>
                                    Add a place and help
                                    build the CoffeeSpot
                                    community.
                                </p>
                            </div>
                        )}


                    {!isLoading
                        && !error
                        && featuredPlaces.length > 0
                        && (
                            <div className="places-grid">
                                {featuredPlaces.map(
                                    place => (
                                        <PlaceCard
                                            key={place.id}
                                            place={place}
                                        />
                                    )
                                )}
                            </div>
                        )}
                </div>
            </section>


            <section className="join-section container">
                <div className="join-copy">
                    <p className="eyebrow">
                        YOUR CITY.
                        YOUR PICKS.
                    </p>

                    <h2>
                        Know a spot
                        we should know?
                    </h2>

                    <p>
                        Help people discover
                        somewhere wonderful.

                        {' '}

                        Add a place,
                        leave a review,
                        and help the best
                        places stand out.
                    </p>
                </div>


                <Link
                    className="
                        button
                        button-light
                    "
                    to="/places/new"
                >
                    Add a place ↗
                </Link>
            </section>
        </>
    );
}


function getFeaturedPlaces(
    places
) {
    const placesWithReviews =
        places.filter(
            place =>
                (place.reviews ?? [])
                    .length > 0
        );


    if (
        placesWithReviews.length > 0
    ) {
        return [
            ...placesWithReviews,
        ]
            .sort(
                (
                    firstPlace,
                    secondPlace
                ) =>
                    getAverageRating(
                        secondPlace
                    )
                    - getAverageRating(
                        firstPlace
                    )
            )
            .slice(
                0,
                3
            );
    }


    return places.slice(
        0,
        3
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
