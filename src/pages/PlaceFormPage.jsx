import {
    useState,
} from 'react';

import {
    useNavigate,
} from 'react-router-dom';

import PageHeading
    from '../components/PageHeading.jsx';

import {
    useAuth,
} from '../hooks/useAuth.js';

import {
    createPlace,
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
        user,
    } = useAuth();

    const [
        formValues,
        setFormValues,
    ] = useState(
        initialFormValues
    );

    const [
        error,
        setError,
    ] = useState('');

    const [
        isSubmitting,
        setIsSubmitting,
    ] = useState(false);


    const isEdit =
        mode === 'edit';


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
            const placeData = {
                owner_id:
                    user.id,

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

            const createdPlace =
                await createPlace(
                    placeData
                );

            navigate(
                `/places/${createdPlace.id}`
            );
        } catch (submitError) {
            console.error(
                submitError
            );

            setError(
                submitError.message
                || 'Could not create place.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }


    if (isEdit) {
        return (
            <div
                className="
                    container
                    inner-page
                    narrow-page
                "
            >
                <PageHeading
                    eyebrow="EDIT PLACE"
                    title="Edit is coming next."
                    description={
                        'First we are finishing '
                        + 'the create flow.'
                    }
                />
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
                eyebrow="SHARE A GOOD PLACE"
                title="Add a new place."
                description={
                    'Help people discover '
                    + 'somewhere worth visiting.'
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
                        placeholder={
                            'Example: '
                            + '15 Hristo Belchev St.'
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
                        value={
                            formValues.description
                        }
                        onChange={
                            handleChange
                        }
                        rows="6"
                        placeholder={
                            'What makes '
                            + 'this place special?'
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
                        : 'Add place'}
                </button>
            </form>
        </div>
    );
}
