import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Topbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center bg-white p-4 shadow">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>

            <button
                onClick={handleLogout}
                className="flex items-center p-0.5 font-semibold border-2 text-sm text-gray-600 hover:text-blue-700 transition-colors"
            >
                Logout
            </button>
        </div>
    );
}

export default Topbar;
