import {
    supabase,
} from '../lib/supabaseClient.js';


export async function getReviewsByPlace(
    placeId
) {
    const {
        data,
        error,
    } = await supabase
        .from('reviews')
        .select(`
            id,
            place_id,
            user_id,
            rating,
            comment,
            created_at,
            profiles (
                username
            )
        `)
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
        .select(`
            id,
            place_id,
            user_id,
            rating,
            comment,
            created_at,
            profiles (
                username
            )
        `)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

