import { Button } from "@/components/ui/button"
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully");
            navigate("/", { replace: true });
        } catch (error) {
            console.error(error);
            toast.error("Failed to logout");
        }
    };
    return (
        <Button
            variant="outline"
            size="icon"
            aria-label="Logout Button"
            className="text-destructive"
            onClick={handleLogout}
        >
            <LogOut />
        </Button>
    )
}

export default Logout
