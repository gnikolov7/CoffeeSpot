import {
    supabase,
} from '../lib/supabaseClient.js';


export async function createPlace(
    placeData
) {
    const {
        data,
        error,
    } = await supabase
        .from('places')
        .insert(placeData)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function getAllPlaces() {
    const {
        data,
        error,
    } = await supabase
        .from('places')
        .select(`
            *,
            reviews (
                rating
            )
        `)
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


export async function getPlaceById(
    placeId
) {
    const {
        data,
        error,
    } = await supabase
        .from('places')
        .select('*')
        .eq(
            'id',
            placeId
        )
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function getPlacesByOwner(
    ownerId
) {
    const {
        data,
        error,
    } = await supabase
        .from('places')
        .select(`
            *,
            reviews (
                rating
            )
        `)
        .eq(
            'owner_id',
            ownerId
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


export async function updatePlace(
    placeId,
    placeData
) {
    const {
        data,
        error,
    } = await supabase
        .from('places')
        .update(placeData)
        .eq(
            'id',
            placeId
        )
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}


export async function deletePlace(
    placeId
) {
    const {
        error,
    } = await supabase
        .from('places')
        .delete()
        .eq(
            'id',
            placeId
        );

    if (error) {
        throw error;
    }
}
