import {
    useState,
} from 'react';

import RatingStars
    from './RatingStars.jsx';

import {
    deleteReview,
    updateReview,
} from '../services/reviewService.js';


export default function ReviewList({
    reviews,
    currentUserId,
    onReviewUpdated,
    onReviewDeleted,
}) {
    const [
        editingReviewId,
        setEditingReviewId,
    ] = useState(null);

    const [
        editRating,
        setEditRating,
    ] = useState(5);

    const [
        editComment,
        setEditComment,
    ] = useState('');

    const [
        error,
        setError,
    ] = useState('');

    const [
        isSaving,
        setIsSaving,
    ] = useState(false);


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


    function startEditing(
        review
    ) {
        setEditingReviewId(
            review.id
        );

        setEditRating(
            review.rating
        );

        setEditComment(
            review.comment
        );

        setError('');
    }


    function cancelEditing() {
        setEditingReviewId(
            null
        );

        setEditComment('');
        setEditRating(5);
        setError('');
    }


    async function handleUpdate(
        reviewId
    ) {
        if (
            editComment
                .trim()
                .length < 5
        ) {
            setError(
                'Review must be '
                + 'at least 5 characters.'
            );

            return;
        }


        setError('');
        setIsSaving(true);


        try {
            const updatedReview =
                await updateReview(
                    reviewId,
                    {
                        rating:
                            Number(
                                editRating
                            ),

                        comment:
                            editComment.trim(),
                    }
                );

            onReviewUpdated(
                updatedReview
            );

            cancelEditing();
        } catch (updateError) {
            console.error(
                updateError
            );

            setError(
                updateError.message
                || 'Could not update review.'
            );
        } finally {
            setIsSaving(false);
        }
    }


    async function handleDelete(
        reviewId
    ) {
        const shouldDelete =
            window.confirm(
                'Delete this review?'
            );

        if (!shouldDelete) {
            return;
        }


        setError('');


        try {
            await deleteReview(
                reviewId
            );

            onReviewDeleted(
                reviewId
            );
        } catch (deleteError) {
            console.error(
                deleteError
            );

            setError(
                deleteError.message
                || 'Could not delete review.'
            );
        }
    }


    return (
        <div className="review-list">
            {reviews.map(
                review => {
                    const isOwner =
                        currentUserId
                        === review.user_id;

                    const isEditing =
                        editingReviewId
                        === review.id;


                    return (
                        <article
                            key={review.id}
                            className="review-card"
                        >
                            <div className="review-card-header">
                                <div>
                                    <div className="review-author">
                                        <strong>
                                            {
                                                review
                                                    .profiles
                                                    ?.username
                                                ?? 'CoffeeSpot user'
                                            }
                                        </strong>
                                    </div>

                                    {!isEditing && (
                                        <RatingStars
                                            rating={
                                                review.rating
                                            }
                                        />
                                    )}
                                </div>


                                {isOwner
                                    && !isEditing
                                    && (
                                        <div className="review-actions">
                                            <button
                                                type="button"
                                                className="
                                                    review-action-button
                                                "
                                                onClick={
                                                    () =>
                                                        startEditing(
                                                            review
                                                        )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="
                                                    review-action-button
                                                    review-delete-button
                                                "
                                                onClick={
                                                    () =>
                                                        handleDelete(
                                                            review.id
                                                        )
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                            </div>


                            {isEditing ? (
                                <div className="review-edit-form">
                                    <div className="form-field">
                                        <label
                                            htmlFor={
                                                `rating-${review.id}`
                                            }
                                        >
                                            Rating
                                        </label>

                                        <select
                                            id={
                                                `rating-${review.id}`
                                            }
                                            value={
                                                editRating
                                            }
                                            onChange={
                                                event =>
                                                    setEditRating(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                            }
                                        >
                                            <option value="5">
                                                ★★★★★
                                            </option>

                                            <option value="4">
                                                ★★★★☆
                                            </option>

                                            <option value="3">
                                                ★★★☆☆
                                            </option>

                                            <option value="2">
                                                ★★☆☆☆
                                            </option>

                                            <option value="1">
                                                ★☆☆☆☆
                                            </option>
                                        </select>
                                    </div>


                                    <div className="form-field">
                                        <label
                                            htmlFor={
                                                `comment-${review.id}`
                                            }
                                        >
                                            Review
                                        </label>

                                        <textarea
                                            id={
                                                `comment-${review.id}`
                                            }
                                            rows="4"
                                            value={
                                                editComment
                                            }
                                            onChange={
                                                event =>
                                                    setEditComment(
                                                        event
                                                            .target
                                                            .value
                                                    )
                                            }
                                        />
                                    </div>


                                    {error && (
                                        <p className="form-error">
                                            {error}
                                        </p>
                                    )}


                                    <div className="review-edit-actions">
                                        <button
                                            type="button"
                                            className="
                                                button
                                                button-dark
                                            "
                                            disabled={
                                                isSaving
                                            }
                                            onClick={
                                                () =>
                                                    handleUpdate(
                                                        review.id
                                                    )
                                            }
                                        >
                                            {isSaving
                                                ? 'Saving...'
                                                : 'Save review'}
                                        </button>

                                        <button
                                            type="button"
                                            className="
                                                button
                                                button-secondary
                                            "
                                            disabled={
                                                isSaving
                                            }
                                            onClick={
                                                cancelEditing
                                            }
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>
                                        {review.comment}
                                    </p>

                                    <span className="review-date">
                                        {
                                            new Date(
                                                review.created_at
                                            )
                                                .toLocaleDateString()
                                        }
                                    </span>
                                </>
                            )}
                        </article>
                    );
                }
            )}
        </div>
    );
}
