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
