import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"
import "./App.css"

function App() {

  const [projects, updateProjects] = useState([])
  const [currentProject, setCurrentProject] = useState({})

  useEffect(() => {
    updateProjects([{name: "Example Project", tasks: [{name: "Example Task"}]}])
  }, [])

  useEffect(() => {
    if (projects.length === 1){
      setCurrentProject(projects[0])
    }
  }, [projects])

  return (
    <div id="main-container">
      <Sidebar
        projects={projects}
        updateProjects={updateProjects}
        setCurrentProject={setCurrentProject} />

      <Tasks
        projects={projects}
        updateProjects={updateProjects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject} />
    </div>
  )
}

export default App