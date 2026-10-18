import {
    useEffect,
    useState,
} from 'react';

import {
    useNavigate,
    useParams,
} from 'react-router-dom';

import PageHeading
    from '../components/PageHeading.jsx';

import {
    useAuth,
} from '../hooks/useAuth.js';

import {
    createPlace,
    getPlaceById,
    updatePlace,
} from '../services/placeService.js';


const initialFormValues = {
    name: '',
    description: '',
    category: 'Restaurant',
    city: 'Sofia',
    address: '',
    imageUrl: '',
};


export default function PlaceFormPage({
    mode,
}) {
    const navigate =
        useNavigate();

    const {
        placeId,
    } = useParams();

    const {
        user,
    } = useAuth();

    const isEdit =
        mode === 'edit';

    const [
        formValues,
        setFormValues,
    ] = useState(
        initialFormValues
    );

    const [
        isLoading,
        setIsLoading,
    ] = useState(
        isEdit
    );

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState('');


    useEffect(() => {
        if (!isEdit) {
            return;
        }

        let isActive = true;


        async function loadPlace() {
            try {
                const place =
                    await getPlaceById(
                        placeId
                    );

                if (
                    place.owner_id !==
                    user.id
                ) {
                    navigate(
                        `/places/${placeId}`
                    );

                    return;
                }

                if (!isActive) {
                    return;
                }

                setFormValues({
                    name:
                        place.name,

                    description:
                        place.description,

                    category:
                        place.category,

                    city:
                        place.city,

                    address:
                        place.address ?? '',

                    imageUrl:
                        place.image_url ?? '',
                });
            } catch (loadError) {
                console.error(
                    loadError
                );

                if (isActive) {
                    setError(
                        'Could not load place.'
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }


        loadPlace();


        return () => {
            isActive = false;
        };
    }, [
        isEdit,
        navigate,
        placeId,
        user.id,
    ]);


    function handleChange(event) {
        const {
            name,
            value,
        } = event.target;

        setFormValues(
            currentValues => ({
                ...currentValues,
                [name]: value,
            })
        );
    }


    function validateForm() {
        if (!formValues.name.trim()) {
            return 'Name is required.';
        }

        if (
            formValues.description
                .trim()
                .length < 10
        ) {
            return (
                'Description must be '
                + 'at least 10 characters.'
            );
        }

        if (!formValues.city.trim()) {
            return 'City is required.';
        }

        return '';
    }


    function buildPlaceData() {
        return {
            name:
                formValues.name.trim(),

            description:
                formValues
                    .description
                    .trim(),

            category:
                formValues.category,

            city:
                formValues.city.trim(),

            address:
                formValues
                    .address
                    .trim(),

            image_url:
                formValues
                    .imageUrl
                    .trim(),
        };
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
            const placeData =
                buildPlaceData();

            if (isEdit) {
                await updatePlace(
                    placeId,
                    placeData
                );

                navigate(
                    `/places/${placeId}`
                );

                return;
            }


            const createdPlace =
                await createPlace({
                    ...placeData,

                    owner_id:
                        user.id,
                });

            navigate(
                `/places/${createdPlace.id}`
            );
        } catch (submitError) {
            console.error(
                submitError
            );

            setError(
                submitError.message
                || 'Could not save place.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }


    if (isLoading) {
        return (
            <div
                className="
                    container
                    inner-page
                "
            >
                Loading place...
            </div>
        );
    }


    return (
        <div
            className="
                container
                inner-page
                narrow-page
            "
        >
            <PageHeading
                eyebrow={
                    isEdit
                        ? 'EDIT PLACE'
                        : 'SHARE A GOOD PLACE'
                }
                title={
                    isEdit
                        ? 'Update your place.'
                        : 'Add a new place.'
                }
                description={
                    isEdit
                        ? 'Keep the information accurate and useful.'
                        : (
                            'Help people discover '
                            + 'somewhere worth visiting.'
                        )
                }
            />


            <form
                className="place-form"
                onSubmit={handleSubmit}
            >
                <div className="form-field">
                    <label htmlFor="name">
                        Place name
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={
                            formValues.name
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Example: BLOND"
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="category">
                        Category
                    </label>

                    <select
                        id="category"
                        name="category"
                        value={
                            formValues.category
                        }
                        onChange={
                            handleChange
                        }
                    >
                        <option>
                            Restaurant
                        </option>

                        <option>
                            Cafe
                        </option>

                        <option>
                            Bakery
                        </option>

                        <option>
                            Bar
                        </option>
                    </select>
                </div>


                <div className="form-field">
                    <label htmlFor="city">
                        City
                    </label>

                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={
                            formValues.city
                        }
                        onChange={
                            handleChange
                        }
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="address">
                        Address
                    </label>

                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={
                            formValues.address
                        }
                        onChange={
                            handleChange
                        }
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="imageUrl">
                        Image URL
                    </label>

                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="url"
                        value={
                            formValues.imageUrl
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="https://..."
                    />
                </div>


                <div className="form-field">
                    <label htmlFor="description">
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        rows="6"
                        value={
                            formValues.description
                        }
                        onChange={
                            handleChange
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
                    disabled={
                        isSubmitting
                    }
                >
                    {isSubmitting
                        ? 'Saving...'
                        : isEdit
                            ? 'Save changes'
                            : 'Add place'}
                </button>
            </form>
        </div>
    );
}
