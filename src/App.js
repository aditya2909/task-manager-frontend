import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Projects from "./pages/Project";
import ProjectDetails from "./pages/ProjectDetails";
import CreateTask from "./pages/CreateTask";
import "./App.css";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/create-task" element={<CreateTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
