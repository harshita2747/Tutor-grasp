import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useAuth } from "../../context/AuthContext";

function Attendance() {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      const studentRes = await fetch("http://localhost:5000/api/students");
      const studentsData = await studentRes.json();

      const summaryRes = await fetch(
        "http://localhost:5000/api/attendance/summary"
      );
      const summaryData = await summaryRes.json();

      setStudents(studentsData);
      setSummary(summaryData);
    } catch (error) {
      console.error("Error fetching attendance data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 //mark attendenace

  const markAttendance = async (studentId, status) => {
    try {
      await fetch("http://localhost:5000/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, status })
      });

      fetchData(); // re-sync after marking
    } catch (error) {
      console.error("Error marking attendance", error);
    }
  };

  if (!user) {
    return <p className="p-6">Unauthorized</p>;
  }

  if (loading) {
    return <p className="p-6">Loading attendance...</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
    
    <div className="flex-1">
        <Topbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Attendance</h1>

          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">Name</th>
                  <th className="border p-3 text-center">Classes</th>
                  <th className="border p-3 text-center">Today</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const record = summary.find(
                    (s) => s.studentId === student._id
                  );

                  return (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="border p-3">{student.name}</td>
                      <td className="border p-3 text-center">
                        {record?.attended || 0}/{record?.totalClasses || 0}
                      </td>
                      <td className="border p-3 text-center space-x-2">
                        <button
                          onClick={() =>
                            markAttendance(student._id, "Present")
                          }
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            markAttendance(student._id, "Absent")
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Absent
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {students.length === 0 && (
              <p className="p-4 text-center text-gray-500">
                No students found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;