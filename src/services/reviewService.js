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
        .select('*')
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
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}
