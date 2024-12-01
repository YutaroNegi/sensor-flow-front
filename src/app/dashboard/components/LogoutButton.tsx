import { Button } from "@/components/ui/button"
import { useAuth } from "@/app/context/AuthContext";


const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return <Button variant="outline" onClick={handleLogout}>Logout</Button>
};

export { LogoutButton };