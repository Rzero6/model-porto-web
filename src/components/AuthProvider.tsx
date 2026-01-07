import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2, LoaderPinwheel } from "lucide-react";

interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const value = useMemo(() => ({ user, loading }), [user, loading]);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return unsub;
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-tl from-[#d4b5a0] via-[#c9a385] to-[#b8916d]">
                <div className="absolute inset-0 bg-linear-to-t from-soft-black/70 via-soft-black/20 to-transparent" />
                <LoaderPinwheel className="h-8 w-8 animate-spin text-ivory" />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context.user;
};

export const useAuthState = () => useContext(AuthContext);
