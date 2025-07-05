import AccountSidebar from "../components/account/AccountSidebar";
import AccountInfoForm from "../components/account/AccountInfoForm";
import AddressForm from "../components/account/AddressForm";
import PasswordForm from "../components/account/PasswordForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Account() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex max-w-6xl mx-auto p-6 space-x-8">
      <AccountSidebar />

      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold text-[#800020] mb-4">My Account</h1>
        <AccountInfoForm />
        <AddressForm />
        <PasswordForm />
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#600018] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
