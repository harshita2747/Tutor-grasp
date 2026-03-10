import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {User,PiggyBank,ReceiptText} from "lucide-react";


const Dashboard = () => {

  const [stats, setStats] = useState({
    totalStudents: 0,
    paidStudents: 0,
    pendingStudents: 0,
    totalFees: 0,
    presentToday:0
  });
  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

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
            <div className="flex justify-between bg-blue-500  p-4 rounded-xl shadow">
           <div>
              <h4 className="font-semibold text-white">Total Students:</h4>
              <p className="text-3xl mt-2 text-white">{stats.totalStudents}</p>
            </div>
            <div><User className="w-16 h-16 text-white" /></div>
            </div>

            {/* <div className=" p-4 bg-purple-500 rounded shadow">
              <h4 className="font-semibold text-white">Paid Fees:</h4>
              <p className="text-3xl mt-2 text-white">₹{stats.paidStudents}</p>
            </div> */}

            <div className="flex justify-between p-4 bg-yellow-500 rounded-xl shadow">
              <div>
                <h4 className="font-semibold text-white">Pending Fees:</h4>
              <p className="text-3xl mt-2 text-white">{stats.pendingStudents}</p>
              </div>
            <div><PiggyBank className="w-16 h-16 text-white" /></div>
            </div>

            <div className="flex justify-between p-4 bg-purple-500 rounded-xl shadow">
             <div> 
              <h4 className="font-semibold text-white">Today Attendance:</h4>
              <p className="text-3xl mt-2 text-white">{stats.presentToday}</p>
              </div>
              <div><ReceiptText className="w-16 h-16 text-white" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
