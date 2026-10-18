import {
    createContext,
    useEffect,
    useState,
} from 'react';

import { supabase } from '../lib/supabaseClient.js';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSession();

        const {
            data: {
                subscription,
            },
        } = supabase.auth.onAuthStateChange(
            handleAuthStateChange
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function loadSession() {
        const {
            data,
        } = await supabase.auth.getSession();

        setSession(data.session);
        setIsLoading(false);
    }

    function handleAuthStateChange(
        event,
        nextSession
    ) {
        setSession(nextSession);
        setIsLoading(false);
    }

    async function register(
        email,
        password
    ) {
        return await supabase.auth.signUp({
            email,
            password,
        });
    }

    async function login(
        email,
        password
    ) {
        return await supabase.auth.signInWithPassword({
            email,
            password,
        });
    }

    async function logout() {
        return await supabase.auth.signOut();
    }

    const user =
        session?.user ?? null;

    const authValue = {
        user,
        session,
        isLoading,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider
            value={authValue}
        >
            {children}
        </AuthContext.Provider>
    );
}
