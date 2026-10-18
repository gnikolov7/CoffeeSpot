import { Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import PlaceDetailsPage from './pages/PlaceDetailsPage.jsx';
import PlaceFormPage from './pages/PlaceFormPage.jsx';
import MyPlacesPage from './pages/MyPlacesPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

/**
 * Day 1: route skeleton. Day 2 adds an AuthProvider, and Day 4 adds route guards.
 * No app records are hardcoded: catalog and details will read the hosted backend.
 */
export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<CatalogPage />} />
        <Route path="/places/:placeId" element={<PlaceDetailsPage />} />
        <Route path="/places/new" element={<PlaceFormPage mode="create" />} />
        <Route path="/places/:placeId/edit" element={<PlaceFormPage mode="edit" />} />
        <Route path="/my-places" element={<MyPlacesPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
