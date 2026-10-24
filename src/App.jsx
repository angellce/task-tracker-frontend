import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import TasksPage from './pages/TasksPage.jsx'
import NewTaskPage from './pages/NewTaskPage.jsx'
import EditTaskPage from './pages/EditTaskPage.jsx'

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId/tasks" element={<TasksPage />} />
          <Route path="/projects/:projectId/tasks/new" element={<NewTaskPage />} />
          <Route path="/projects/:projectId/tasks/:taskId/edit" element={<EditTaskPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
