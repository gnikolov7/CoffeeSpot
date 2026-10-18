import RatingStars
    from './RatingStars.jsx';


export default function ReviewList({
    reviews,
}) {
    if (reviews.length === 0) {
        return (
            <div className="empty-state">
                <h3>
                    No reviews yet.
                </h3>

                <p>
                    Be the first person
                    to share an opinion.
                </p>
            </div>
        );
    }


    return (
        <div className="review-list">
            {reviews.map(
                review => (
                    <article
                        key={review.id}
                        className="review-card"
                    >
                        <RatingStars
                            rating={
                                review.rating
                            }
                        />

                        <p>
                            {review.comment}
                        </p>

                        <span className="review-date">
                            {new Date(
                                review.created_at
                            ).toLocaleDateString()}
                        </span>
                    </article>
                )
            )}
        </div>
    );
}
