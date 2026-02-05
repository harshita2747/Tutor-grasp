import { Routes, Route,Navigate, BrowserRouter } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Students from "./pages/students/Students";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute> <Students /></ProtectedRoute>} />
    </Routes> 
    <ToastContainer/>
   </>
  );
}

export default App;
