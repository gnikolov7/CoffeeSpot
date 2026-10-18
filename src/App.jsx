import {
    Route,
    Routes,
} from 'react-router-dom';

import AppShell from './components/AppShell.jsx';

import ProtectedRoute
    from './components/ProtectedRoute.jsx';

import GuestRoute
    from './components/GuestRoute.jsx';

import HomePage
    from './pages/HomePage.jsx';

import CatalogPage
    from './pages/CatalogPage.jsx';

import PlaceDetailsPage
    from './pages/PlaceDetailsPage.jsx';

import PlaceFormPage
    from './pages/PlaceFormPage.jsx';

import MyPlacesPage
    from './pages/MyPlacesPage.jsx';

import AuthPage
    from './pages/AuthPage.jsx';

import NotFoundPage
    from './pages/NotFoundPage.jsx';


export default function App() {
    return (
        <AppShell>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage />
                    }
                />

                <Route
                    path="/places"
                    element={
                        <CatalogPage />
                    }
                />

                <Route
                    path="/places/:placeId"
                    element={
                        <PlaceDetailsPage />
                    }
                />

                <Route
                    path="/places/new"
                    element={
                        <ProtectedRoute>
                            <PlaceFormPage
                                mode="create"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/places/:placeId/edit"
                    element={
                        <ProtectedRoute>
                            <PlaceFormPage
                                mode="edit"
                            />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-places"
                    element={
                        <ProtectedRoute>
                            <MyPlacesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <GuestRoute>
                            <AuthPage
                                mode="login"
                            />
                        </GuestRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <GuestRoute>
                            <AuthPage
                                mode="register"
                            />
                        </GuestRoute>
                    }
                />

                <Route
                    path="*"
                    element={
                        <NotFoundPage />
                    }
                />
            </Routes>
        </AppShell>
    );
}

