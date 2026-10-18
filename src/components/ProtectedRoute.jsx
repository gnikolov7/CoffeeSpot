import {
    Navigate,
} from 'react-router-dom';

import {
    useAuth,
} from '../hooks/useAuth.js';


export default function ProtectedRoute({
    children,
}) {
    const {
        user,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return (
            <div
                className="
                    container
                    inner-page
                "
            >
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}
