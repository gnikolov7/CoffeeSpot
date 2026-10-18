import {
    useState,
} from 'react';

import {
    createReview,
} from '../services/reviewService.js';


export default function ReviewForm({
    placeId,
    userId,
    onReviewCreated,
}) {
    const [
        rating,
        setRating,
    ] = useState(5);

    const [
        comment,
        setComment,
    ] = useState('');

    const [
        error,
        setError,
    ] = useState('');

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);


    function validateForm() {
        if (
            comment
                .trim()
                .length < 5
        ) {
            return (
                'Review must be '
                + 'at least 5 characters.'
            );
        }

        return '';
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setError('');

        const validationError =
            validateForm();

        if (validationError) {
            setError(
                validationError
            );

            return;
        }

        setIsSubmitting(true);

        try {
            const createdReview =
                await createReview({
                    place_id:
                        placeId,

                    user_id:
                        userId,

                    rating:
                        Number(rating),

                    comment:
                        comment.trim(),
                });

            setRating(5);
            setComment('');

            onReviewCreated(
                createdReview
            );
        } catch (submitError) {
            console.error(
                submitError
            );

            if (
                submitError.code ===
                '23505'
            ) {
                setError(
                    'You have already reviewed '
                    + 'this place.'
                );
            } else {
                setError(
                    submitError.message
                    || 'Could not submit review.'
                );
            }
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <form
            className="review-form"
            onSubmit={handleSubmit}
        >
            <h3>
                Write a review
            </h3>


            <div className="form-field">
                <label htmlFor="rating">
                    Rating
                </label>

                <select
                    id="rating"
                    value={rating}
                    onChange={
                        event =>
                            setRating(
                                event.target.value
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
                <label htmlFor="comment">
                    Your review
                </label>

                <textarea
                    id="comment"
                    rows="4"
                    value={comment}
                    onChange={
                        event =>
                            setComment(
                                event.target.value
                            )
                    }
                    placeholder={
                        'What did you like '
                        + 'about this place?'
                    }
                />
            </div>


            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}


            <button
                type="submit"
                className="
                    button
                    button-dark
                "
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? 'Publishing...'
                    : 'Publish review'}
            </button>
        </form>
    );
}
