export default function RatingStars({
    rating,
}) {
    const roundedRating =
        Math.round(rating);

    return (
        <span
            className="rating-stars"
            aria-label={
                `${rating} out of 5 stars`
            }
        >
            {[1, 2, 3, 4, 5].map(
                star => (
                    <span
                        key={star}
                        className={
                            star <= roundedRating
                                ? 'star star-filled'
                                : 'star'
                        }
                    >
                        ★
                    </span>
                )
            )}
        </span>
    );
}
