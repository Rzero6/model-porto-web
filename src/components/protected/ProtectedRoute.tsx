import { Navigate } from "react-router-dom";
import { useAuthState } from "@/components/AuthProvider";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuthState();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
