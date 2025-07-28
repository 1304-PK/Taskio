import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Tasks from "./components/Tasks"
import "./App.css"

function App() {

  const [projects, updateProjects] = useState([])

  return (
    <div id="main-container">
      <Sidebar projects={projects} updateProjects={updateProjects}/>
      <Tasks />
    </div>
  )
}

export default App