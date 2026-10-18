import {
    useEffect,
    useState,
} from 'react';

import {
    Link,
    useNavigate,
    useParams,
} from 'react-router-dom';

import {
    deletePlace,
    getPlaceById,
} from '../services/placeService.js';

import {
    getReviewsByPlace,
} from '../services/reviewService.js';

import {
    useAuth,
} from '../hooks/useAuth.js';

import RatingStars
    from '../components/RatingStars.jsx';

import ReviewForm
    from '../components/ReviewForm.jsx';

import ReviewList
    from '../components/ReviewList.jsx';


export default function PlaceDetailsPage() {
    const navigate =
        useNavigate();

    const {
        placeId,
    } = useParams();

    const {
        user,
    } = useAuth();

    const [
        place,
        setPlace,
    ] = useState(null);

    const [
        reviews,
        setReviews,
    ] = useState([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        isDeleting,
        setIsDeleting,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState('');


    useEffect(() => {
        let isActive = true;


        async function loadPageData() {
            try {
                const [
                    loadedPlace,
                    loadedReviews,
                ] = await Promise.all([
                    getPlaceById(
                        placeId
                    ),

                    getReviewsByPlace(
                        placeId
                    ),
                ]);

                if (!isActive) {
                    return;
                }

                setPlace(
                    loadedPlace
                );

                setReviews(
                    loadedReviews
                );
            } catch (loadError) {
                console.error(
                    loadError
                );

                if (isActive) {
                    setError(
                        'Could not load this place.'
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }


        loadPageData();


        return () => {
            isActive = false;
        };
    }, [
        placeId,
    ]);


    function handleReviewCreated(
        createdReview
    ) {
        setReviews(
            currentReviews => [
                createdReview,
                ...currentReviews,
            ]
        );
    }


    function calculateAverageRating() {
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


    async function handleDelete() {
        const shouldDelete =
            window.confirm(
                'Delete this place?'
            );

        if (!shouldDelete) {
            return;
        }

        setError('');
        setIsDeleting(true);

        try {
            await deletePlace(
                placeId
            );

            navigate(
                '/places'
            );
        } catch (deleteError) {
            console.error(
                deleteError
            );

            setError(
                deleteError.message
                || 'Could not delete place.'
            );

            setIsDeleting(false);
        }
    }


    if (isLoading) {
        return (
            <div
                className="
                    container
                    inner-page
                "
            >
                Loading place...
            </div>
        );
    }


    if (error && !place) {
        return (
            <div
                className="
                    container
                    inner-page
                "
            >
                <h1>
                    Place not found.
                </h1>

                <p className="form-error">
                    {error}
                </p>

                <Link
                    to="/places"
                    className="
                        button
                        button-dark
                    "
                >
                    Back to Explore
                </Link>
            </div>
        );
    }


    if (!place) {
        return null;
    }


    const isOwner =
        user?.id === place.owner_id;

    const averageRating =
        calculateAverageRating();


    return (
        <div
            className="
                container
                inner-page
            "
        >
            <div className="place-details">
                <div className="place-details-image">
                    {place.image_url ? (
                        <img
                            src={place.image_url}
                            alt={place.name}
                        />
                    ) : (
                        <div
                            className="
                                place-image-placeholder
                                place-image-placeholder-large
                            "
                        >
                            ✳
                        </div>
                    )}
                </div>


                <div className="place-details-content">
                    <p className="eyebrow">
                        {place.category}
                        {' · '}
                        {place.city}
                    </p>


                    <h1>
                        {place.name}

                        <span className="heading-dot">
                            .
                        </span>
                    </h1>


                    <div className="place-rating">
                        {reviews.length > 0 ? (
                            <>
                                <RatingStars
                                    rating={
                                        averageRating
                                    }
                                />

                                <strong>
                                    {averageRating
                                        .toFixed(1)}
                                </strong>

                                <span>
                                    {reviews.length}
                                    {' '}
                                    {reviews.length === 1
                                        ? 'review'
                                        : 'reviews'}
                                </span>
                            </>
                        ) : (
                            <span>
                                No ratings yet
                            </span>
                        )}
                    </div>


                    <p className="place-description">
                        {place.description}
                    </p>


                    {place.address && (
                        <div className="place-info">
                            <span>
                                Address
                            </span>

                            <strong>
                                {place.address}
                            </strong>
                        </div>
                    )}


                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}


                    {isOwner && (
                        <div className="owner-actions">
                            <Link
                                to={
                                    `/places/${place.id}/edit`
                                }
                                className="
                                    button
                                    button-dark
                                "
                            >
                                Edit place
                            </Link>

                            <button
                                type="button"
                                className="
                                    button
                                    button-danger
                                "
                                onClick={
                                    handleDelete
                                }
                                disabled={
                                    isDeleting
                                }
                            >
                                {isDeleting
                                    ? 'Deleting...'
                                    : 'Delete place'}
                            </button>
                        </div>
                    )}
                </div>
            </div>


            <section className="reviews-section">
                <div className="reviews-heading">
                    <div>
                        <p className="eyebrow">
                            COMMUNITY
                        </p>

                        <h2>
                            Reviews.
                        </h2>
                    </div>
                </div>


                {user && (
                    <ReviewForm
                        placeId={
                            place.id
                        }
                        userId={
                            user.id
                        }
                        onReviewCreated={
                            handleReviewCreated
                        }
                    />
                )}


                {!user && (
                    <div className="review-login-message">
                        <Link
                            to="/login"
                            className="text-link"
                        >
                            Log in to write a review
                            {' '}
                            →
                        </Link>
                    </div>
                )}


                <ReviewList
                    reviews={
                        reviews
                    }
                />
            </section>
        </div>
    );
}
