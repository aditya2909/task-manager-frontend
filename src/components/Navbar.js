import API from "../services/api";

export default function Navbar() {
  const role = localStorage.getItem("role");

  const logoutUser = async () => {
    try {
      await API.post("/logout");
    } catch (err) {
      console.log("Logout API failed (token may already be invalid)");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        Task Manager
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm px-3 py-1 bg-gray-200 rounded">
          {role?.toUpperCase()}
        </span>

        <button
          onClick={logoutUser}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}