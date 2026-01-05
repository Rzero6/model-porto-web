import LoginForm from "@/components/LoginForm";
import { useAuth } from "@/components/AuthProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
    const user = useAuth();
    if (user) {
        return <Navigate to="/admin" replace />;
    }
    return (
        <main className="relative min-h-screen flex items-center justify-center px-4 py-12">
            <div className="relative z-10 w-full">
                <LoginForm />
            </div>
        </main>
    );
};

export default Login;