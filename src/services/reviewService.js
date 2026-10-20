import {
    supabase,
} from '../lib/supabaseClient.js';


const reviewSelect = `
    id,
    place_id,
    user_id,
    rating,
    comment,
    created_at,
    profiles (
        username
    )
`;


export async function getReviewsByPlace(
    placeId
) {
    const {
        data,
        error,
    } = await supabase
        .from('reviews')
        .select(reviewSelect)
        .eq(
            'place_id',
            placeId
        )
        .order(
            'created_at',
            {
                ascending: false,
            }
        );

    if (error) {
        throw error;
    }

    return data ?? [];
}


export async function createReview(
    reviewData
) {
    const {
        data,
        error,
    } = await supabase
        .from('reviews')
        .insert(reviewData)
        .select(reviewSelect)
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function updateReview(
    reviewId,
    reviewData
) {
    const {
        data,
        error,
    } = await supabase
        .from('reviews')
        .update(reviewData)
        .eq(
            'id',
            reviewId
        )
        .select(reviewSelect)
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function deleteReview(
    reviewId
) {
    const {
        error,
    } = await supabase
        .from('reviews')
        .delete()
        .eq(
            'id',
            reviewId
        );

    if (error) {
        throw error;
    }
}


