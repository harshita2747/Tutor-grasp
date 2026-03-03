import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, User, LogOut,LayoutDashboard } from "lucide-react";

function Topbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center bg-white p-4 shadow">
           <div className="flex justify-between gap-2"> 
         <LayoutDashboard className=""/>
            <h2 className="text-xl font-semibold"> {user?.name} Dashboard</h2>
            </div>

          <div>  <button
                onClick={handleLogout}
                className="flex items-center p-0.5 font-semibold border-2 text-sm text-gray-600 hover:text-blue-700 transition-colors"
            >
                Logout
            </button></div>
        </div>
    );
}

export default Topbar;
