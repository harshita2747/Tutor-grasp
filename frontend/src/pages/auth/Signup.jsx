import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("parent");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, password, role });
        if (!email || !password) {
            alert("Please fill all the fields!");
            return;
        }

        console.log({ email, password });
        alert(" welcome to tutor grasp");


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <p className="mb-2 text-center font-bold text-2xl text-gray-600 animate-fade-in-delay">Tutor Grasp</p>
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                    Create your account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
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
                    <div>
                        <label className="block mb-1">Role</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="role"
                                    value="teacher"
                                    checked={role === "teacher"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="accent-blue-500"
                                />
                                Teacher
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="role"
                                    value="parent"
                                    checked={role === "parent"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="accent-blue-500"
                                />
                                Parent
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Signup
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
