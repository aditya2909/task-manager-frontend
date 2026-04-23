import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    API.get("/projects").then((res) => setProjects(res.data));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-white shadow rounded-lg p-4 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">
              {project.title}
            </h2>
            <p className="text-gray-600">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}