import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in both email and password!");
      return;
    }

    // Simulate authentication: create a simple user object and store via context
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matched = users.find((u) => u.email === email && u.password === password);
      if (!matched) {
        alert("Invalid credentials. Please sign up or check your email/password.");
        return;
      }

      const userData = { email: matched.email, name: matched.name, role: matched.role };
      login(userData);
      navigate("/dashboard");
  };

  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }
  },[user,navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="mb-2 text-center font-bold text-2xl text-gray-600 animate-fade-in-delay">Tutor Grasp</p>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;