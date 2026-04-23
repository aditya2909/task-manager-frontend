import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function CreateTask() {
  const role = localStorage.getItem("role");

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [projectId, setProjectId] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState("");

  // Protect route (Admin only)
  if (role !== "admin") {
    window.location.href = "/projects";
  }

  useEffect(() => {
    // Load projects
    API.get("/projects").then((res) =>
      setProjects(res.data)
    );

    // Load users
    API.get("/users").then((res) =>
      setUsers(res.data)
    );
  }, []);

  const createTask = async () => {
    try {
      await API.post("/tasks", {
        project_id: projectId,
        assigned_to: assignedTo,
        title,
        description,
        priority,
        due_date: dueDate,
      });

      alert("Task assigned successfully ✅");
      window.location.href = "/projects";
    } catch (err) {
      alert("Task creation failed ❌");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center py-10">
        <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Assign Task
          </h2>

          {/* Project Dropdown */}
          <label className="block mb-1 font-medium">
            Select Project
          </label>

          <select
            className="w-full border p-2 rounded mb-4"
            onChange={(e) =>
              setProjectId(e.target.value)
            }
          >
            <option>Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.title}
              </option>
            ))}
          </select>

          {/* User Dropdown */}
          <label className="block mb-1 font-medium">
            Assign To User
          </label>

          <select
            className="w-full border p-2 rounded mb-4"
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
          >
            <option>Select User</option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {/* Title */}
          <input
            placeholder="Task title"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full border p-2 rounded mb-4"
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          {/* Priority */}
          <label className="block mb-1 font-medium">
            Priority
          </label>

          <select
            className="w-full border p-2 rounded mb-4"
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>

          {/* Due Date */}
          <label className="block mb-1 font-medium">
            Due Date
          </label>

          <input
            type="date"
            className="w-full border p-2 rounded mb-6"
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          {/* Submit Button */}
          <button
            onClick={createTask}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Assign Task
          </button>

        </div>
      </div>
    </div>
  );
}