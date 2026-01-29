import { useState } from "react";

function AddStudentModal({ onClose, onAdd, initial = null, onSave }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    className: initial?.className || "",
    phone: initial?.phone || "",
    school: initial?.school || "",
    schoolFees: initial?.schoolFees || "",  // ← Added this
    feesStatus: initial?.feesStatus || "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.className || !form.phone || !form.school || !form.schoolFees) {  // ← Added schoolFees check
      alert("All fields required");
      return;
    }

    // Convert schoolFees to number before sending
    const studentData = {
      ...form,
      schoolFees: Number(form.schoolFees)  // ← Convert to number
    };

    if (initial && typeof onSave === "function") {
      onSave(studentData);
    } else {
      onAdd(studentData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-opacity-5 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {initial ? "Edit Student" : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Student Name"
            value={form.name}
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Class"
            value={form.className}
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, className: e.target.value })}
          />

          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            type="text"
            placeholder="School Name"
            value={form.school}
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, school: e.target.value })}
          />

          {/* ← ADDED THIS FIELD */}
          <input
            type="number"
            placeholder="Fees"
            value={form.schoolFees}
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, schoolFees: e.target.value })}
          />

          <select
            value={form.feesStatus}
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, feesStatus: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {initial ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentModal;