import {
    Link,
} from 'react-router-dom';

import RatingStars
    from './RatingStars.jsx';


export default function PlaceCard({
    place,
}) {
    const reviews =
        place.reviews ?? [];

    const averageRating =
        calculateAverageRating(
            reviews
        );


    return (
        <Link
            to={`/places/${place.id}`}
            className="place-card"
        >
            <div className="place-card-image">
                {place.image_url ? (
                    <img
                        src={place.image_url}
                        alt={place.name}
                    />
                ) : (
                    <div
                        className="
                            place-image-placeholder
                        "
                    >
                        ✳
                    </div>
                )}
            </div>


            <div className="place-card-content">
                <div className="place-card-meta">
                    <span>
                        {place.category}
                    </span>

                    <span>
                        {place.city}
                    </span>
                </div>


                <h2>
                    {place.name}
                </h2>


                <div className="place-card-rating">
                    {reviews.length > 0 ? (
                        <>
                            <RatingStars
                                rating={
                                    averageRating
                                }
                            />

                            <strong>
                                {
                                    averageRating
                                        .toFixed(1)
                                }
                            </strong>

                            <span>
                                (
                                {reviews.length}
                                )
                            </span>
                        </>
                    ) : (
                        <span>
                            No reviews yet
                        </span>
                    )}
                </div>


                <p>
                    {place.description}
                </p>


                <span className="place-card-link">
                    View place
                    {' '}
                    →
                </span>
            </div>
        </Link>
    );
}


function calculateAverageRating(
    reviews
) {
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

