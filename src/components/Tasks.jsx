import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "../styles/Tasks.css"

function Tasks({ projects, updateProjects, currentProject, setCurrentProject }) {

  const dialog = useRef(null)
  const input = useRef(null)
  const selectTag = useRef(null)

  const openTaskDialog = () => {
    dialog.current.showModal()
  }

  const addTask = (e) => {
    e.preventDefault()
    updateProjects(
      projects.map(i => {
        if (i.name === selectTag.current.value) {
          return ({ name: i.name, tasks: [...i.tasks, { name: input.current.value }] })
        }
        else {
          return {...i}
        }
      })
    )
    dialog.current.close()
  }

  useEffect(() => {
    selectTag.current.value && setCurrentProject(projects.find(i => i.name === selectTag.current.value))
  }, [projects])

  return (
    <>
      <div id="main-div">
        <h1>{currentProject.name}</h1>
        <div id="task-section">
          <h2>Tasks</h2>
          <div id="tasks">
            {
              currentProject.tasks && currentProject.tasks.map(item => {
                return (
                  <div key={item.name}>
                    <p>{item.name}</p>
                    <input type="checkbox" />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div>
          <button onClick={openTaskDialog}><FontAwesomeIcon icon={faPlus} /></button>
        </div>
      </div>

      <dialog ref={dialog}>
        <h1>Add Task</h1>
        <form>
          <input type="text" id="task-name-input" ref={input} />
          <select name="projects-dropdown" id="projects-dropdown" ref={selectTag}>
            {
              projects.map(project => {
                return (
                  <option value={project.name} key={project.name}>{project.name}</option>
                )
              })
            }
          </select>
          <button onClick={(e) => { addTask(e) }}>Submit</button>
        </form>
      </dialog>
    </>
  )
}

export default Tasks