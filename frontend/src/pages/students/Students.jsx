import { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import AddStudentModal from "../../components/AddStudentModal";

function Students() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterSchool, setFilterSchool] = useState("");
    const [onlyPending, setOnlyPending] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch students from backend when component mounts
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setLoading(false);
            alert('Failed to fetch students');
        }
    };

    const handleAddStudent = async (student) => {
        try {
            const response = await axios.post('http://localhost:5000/api/students/add', student);
            setStudents([...students, response.data]);
            alert('Student added successfully!');
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Failed to add student');
        }
    };

    const handleUpdateStudent = async (updated) => {
        try {
            const studentId = students[editingIndex]._id;
            const response = await axios.put(`http://localhost:5000/api/students/${studentId}`, updated);
            setStudents(
                students.map((s, i) => (i === editingIndex ? response.data : s))
            );
            setEditingIndex(null);
            alert('Student updated successfully!');
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Failed to update student');
        }
    };

    const handleDeleteStudent = async (index) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const studentId = students[index]._id;
                await axios.delete(`http://localhost:5000/api/students/${studentId}`);
                setStudents(students.filter((_, i) => i !== index));
                alert('Student deleted successfully!');
            } catch (error) {
                console.error('Error deleting student:', error);
                alert('Failed to delete student');
            }
        }
    };

    const filteredStudents = students.filter((s) => {
        const matchSearch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.phone.includes(search) ||
            s.school.toLowerCase().includes(search.toLowerCase());

        const matchClass = filterClass ? s.className === filterClass : true;
        const matchSchool = filterSchool ? s.school === filterSchool : true;
        const matchFees = onlyPending ? s.feesStatus === "Pending" : true;

        return matchSearch && matchClass && matchSchool && matchFees;
    });

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1">
                <Topbar />

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Students</h1>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            + Add Student
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Search name / phone / school"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 rounded"
                        />

                        <input
                            placeholder="Filter by Class"
                            value={filterClass}
                            onChange={(e) => setFilterClass(e.target.value)}
                            className="border p-2 rounded"
                        />

                        <input
                            placeholder="Filter by School"
                            value={filterSchool}
                            onChange={(e) => setFilterSchool(e.target.value)}
                            className="border p-2 rounded"
                        />

                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={onlyPending}
                                onChange={() => setOnlyPending(!onlyPending)}
                            />
                            Fees Pending
                        </label>
                    </div>

                    <div className="bg-white rounded shadow overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Class</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3">School</th>
                                    <th className="p-3">Fees</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center">
                                            Loading students...
                                        </td>
                                    </tr>
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-4 text-center">
                                            No students found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((s, index) => (
                                        <tr key={s._id} className="border-t">
                                            <td className="p-3">{s.name}</td>
                                            <td className="p-3">{s.className}</td>
                                            <td className="p-3">{s.phone}</td>
                                            <td className="p-3">{s.school}</td>
                                            <td
                                                className={`p-3 font-semibold ${
                                                    s.feesStatus === "Pending"
                                                        ? "text-red-500"
                                                        : "text-green-600"
                                                }`}
                                            >
                                                {s.feesStatus}
                                            </td>
                                            <td className="p-3 space-x-2">
                                                <button
                                                    className="text-blue-500"
                                                    onClick={() => {
                                                        setEditingIndex(index);
                                                        setShowModal(true);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => handleDeleteStudent(index)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <AddStudentModal
                    initial={editingIndex !== null ? students[editingIndex] : null}
                    onClose={() => {
                        setShowModal(false);
                        setEditingIndex(null);
                    }}
                    onAdd={handleAddStudent}
                    onSave={handleUpdateStudent}
                />
            )}
        </div>
    );
}

export default Students;