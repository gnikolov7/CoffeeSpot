import {
    useState,
} from 'react';

import {
    Link,
    useNavigate,
} from 'react-router-dom';

import PageHeading from '../components/PageHeading.jsx';

import {
    useAuth,
} from '../hooks/useAuth.js';

export default function AuthPage({
    mode,
}) {
    const navigate = useNavigate();

    const {
        login,
        register,
    } = useAuth();

    const isRegister =
        mode === 'register';

    const [email, setEmail] =
        useState('');

    const [password, setPassword] =
        useState('');

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState('');

    const [error, setError] =
        useState('');

    const [message, setMessage] =
        useState('');

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setError('');
        setMessage('');

        if (!email.trim()) {
            setError(
                'Email is required.'
            );

            return;
        }

        if (password.length < 6) {
            setError(
                'Password must be at least 6 characters.'
            );

            return;
        }

        if (
            isRegister &&
            password !== confirmPassword
        ) {
            setError(
                'Passwords do not match.'
            );

            return;
        }

        setIsSubmitting(true);

        if (isRegister) {
            await handleRegister();
        } else {
            await handleLogin();
        }

        setIsSubmitting(false);
    }

    async function handleRegister() {
        const {
            data,
            error: registerError,
        } = await register(
            email,
            password
        );

        if (registerError) {
            setError(
                registerError.message
            );

            return;
        }

        if (data.session) {
            navigate('/places');

            return;
        }

        setMessage(
            'Account created. Check your email to confirm your account.'
        );
    }

    async function handleLogin() {
        const {
            error: loginError,
        } = await login(
            email,
            password
        );

        if (loginError) {
            setError(
                loginError.message
            );

            return;
        }

        navigate('/places');
    }

    return (
        <div
            className="
                container
                inner-page
                auth-layout
            "
        >
            <div className="auth-copy">
                <PageHeading
                    eyebrow="JOIN THE GOOD TASTE CLUB"
                    title={
                        isRegister
                            ? 'Make yourself at home.'
                            : 'Welcome back.'
                    }
                    description={
                        isRegister
                            ? 'Create an account to share places and experiences.'
                            : 'Log in to manage your places.'
                    }
                />

                <p className="auth-switch">
                    {isRegister
                        ? 'Already have an account? '
                        : 'New to CoffeeSpot? '}

                    <Link
                        to={
                            isRegister
                                ? '/login'
                                : '/register'
                        }
                    >
                        {isRegister
                            ? 'Log in'
                            : 'Create an account'}
                    </Link>
                </p>
            </div>

            <div className="auth-card">
                <h2>
                    {isRegister
                        ? 'Create your account'
                        : 'Sign in'}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >
                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        placeholder="you@example.com"
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        placeholder="Minimum 6 characters"
                    />

                    {isRegister && (
                        <>
                            <label>
                                Confirm password
                            </label>

                            <input
                                type="password"
                                value={
                                    confirmPassword
                                }
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                placeholder="Repeat password"
                            />
                        </>
                    )}

                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="form-message">
                            {message}
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
                            ? 'Please wait...'
                            : isRegister
                                ? 'Create account'
                                : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    );
}
