import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        <Topbar />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4">
            Welcome to Tutor Grasp 🎓
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-500 p-4 rounded shadow">
              <h4 className="font-semibold text-white">Total Students</h4>
              <p className="text-3xl mt-2 text-white">0</p>
            </div>

            <div className="bg-white p-4 bg-yellow-500 rounded shadow">
              <h4 className="font-semibold text-white">Pending Fees</h4>
              <p className="text-3xl mt-2 text-white">₹0</p>
            </div>

            <div className=" p-4 bg-purple-500 rounded shadow">
              <h4 className="font-semibold text-white">Today Attendance</h4>
              <p className="text-3xl mt-2 text-white">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
