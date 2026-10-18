import {
    Link,
    NavLink,
    useNavigate,
} from 'react-router-dom';

import {
    useAuth,
} from '../hooks/useAuth.js';


export default function AppShell({
    children,
}) {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    async function handleLogout() {
        const {
            error,
        } = await logout();

        if (error) {
            console.error(
                'Logout failed:',
                error
            );

            return;
        }

        navigate('/');
    }


    return (
        <div className="app-shell">
            <header className="site-header">
                <div
                    className="
                        header-inner
                        container
                    "
                >
                    <Link
                        className="brand"
                        to="/"
                        aria-label="CoffeeSpot homepage"
                    >
                        <span
                            className="brand-symbol"
                            aria-hidden="true"
                        >
                            ✳
                        </span>

                        <span>
                            Coffee

                            <span
                                className="brand-accent"
                            >
                                Spot
                            </span>

                            <span
                                className="brand-period"
                            >
                                .
                            </span>
                        </span>
                    </Link>


                    <nav
                        className="nav-links"
                        aria-label="Main navigation"
                    >
                        <NavLink
                            to="/places"
                            className={
                                ({ isActive }) =>
                                    isActive
                                        ? 'nav-link is-active'
                                        : 'nav-link'
                            }
                        >
                            Explore
                        </NavLink>


                        {user && (
                            <>
                                <NavLink
                                    to="/my-places"
                                    className={
                                        ({ isActive }) =>
                                            isActive
                                                ? 'nav-link is-active'
                                                : 'nav-link'
                                    }
                                >
                                    My places
                                </NavLink>

                                <NavLink
                                    to="/places/new"
                                    className={
                                        ({ isActive }) =>
                                            isActive
                                                ? 'nav-link is-active'
                                                : 'nav-link'
                                    }
                                >
                                    Add a place
                                </NavLink>
                            </>
                        )}
                    </nav>


                    <div className="account-links">
                        {!user && (
                            <>
                                <Link
                                    className="login-link"
                                    to="/login"
                                >
                                    Log in
                                </Link>

                                <Link
                                    className="
                                        button
                                        button-dark
                                        button-sm
                                    "
                                    to="/register"
                                >
                                    Sign up

                                    <span
                                        aria-hidden="true"
                                    >
                                        ↗
                                    </span>
                                </Link>
                            </>
                        )}


                        {user && (
                            <button
                                type="button"
                                className="
                                    login-link
                                    logout-button
                                "
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        )}
                    </div>
                </div>
            </header>


            <main id="main-content">
                {children}
            </main>


            <footer className="site-footer">
                <div
                    className="
                        container
                        footer-inner
                    "
                >
                    <div>
                        <strong>
                            CoffeeSpot.
                        </strong>

                        <span>
                            Good places,
                            great stories.
                        </span>
                    </div>

                    <span>
                        Built with React
                        {' • '}
                        SoftUni project
                    </span>
                </div>
            </footer>
        </div>
    );
}
