import { useState } from "react";

function AddStudentModal({ onClose, onAdd, initial = null, onSave }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    className: initial?.className || "",
    phone: initial?.phone || "",
    school: initial?.school || "",
    feesStatus: initial?.feesStatus || "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.className || !form.phone || !form.school) {
      alert("All fields required");
      return;
    }

    if (initial && typeof onSave === "function") {
      onSave(form);
    } else {
      onAdd(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{initial ? "Edit Student" : "Add Student"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Student Name"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Class"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, className: e.target.value })}
          />

          <input
            placeholder="Phone"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="School Name"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, school: e.target.value })}
          />

          <select
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, feesStatus: e.target.value })
            }
          >
            <option>Pending</option>
            <option>Paid</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded"
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
