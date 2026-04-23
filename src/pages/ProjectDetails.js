import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    API.get(`/projects/${id}`).then((res) => {
      console.log(res);
      setTasks(res.data.tasks);
    });
  }, [id]);

  const updateStatus = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}/status`, {
        status: newStatus,
      });

      alert("Task status updated ✅");

      // refresh task list
      API.get(`/projects/${id}`).then((res) => {
        setTasks(res.data.tasks);
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Status change blocked (Django rule applied)",
      );
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {role === "admin" && (
        <a
          href="/create-task"
          className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
        >
          + Create Task
        </a>
      )}
      <h1 className="text-2xl font-bold mb-6">Project Tasks</h1>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{task.title}</h2>

            <p className="text-sm text-gray-500">Priority: {task.priority}</p>

            <p className="text-sm text-gray-500">Due: {task.due_date}</p>

            {/* STATUS BADGE */}
            <span
              className={`px-3 py-1 rounded text-white text-sm ${
                task.status === "DONE"
                  ? "bg-green-500"
                  : task.status === "IN_PROGRESS"
                    ? "bg-yellow-500"
                    : task.status === "OVERDUE"
                      ? "bg-red-500"
                      : "bg-gray-500"
              }`}
            >
              {task.status}
            </span>

            {/* STATUS ACTION BUTTONS */}
            <div className="mt-3 flex gap-2">
              {task.status === "TODO" && (
                <button
                  onClick={() => updateStatus(task.id, "IN_PROGRESS")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Start
                </button>
              )}

              {task.status === "IN_PROGRESS" && (
                <button
                  onClick={() => updateStatus(task.id, "DONE")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Complete
                </button>
              )}

              {task.status === "OVERDUE" && role === "admin" && (
                <button
                  onClick={() => updateStatus(task.id, "DONE")}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Close Overdue
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
