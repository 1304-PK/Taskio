import React from 'react'
import { useRef, useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button"
import "../styles/Tasks.css"

function Tasks({ projects, updateProjects, currentProject, setCurrentProject }) {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const dialog = useRef(null)
  const input = useRef(null)
  const selectTag = useRef(null)
  const date = useRef(null)

  const [display, setDisplay] = useState("none")

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1)
  }

  const dateFormat = (date) => {
    const v = date.split('-')
    return v[2] + '-' + v[1] + '-' + v[0]
  }

  const openTaskDialog = () => {
    dialog.current.showModal()
  }

  const closeTaskDialog = (e) => {
    e.preventDefault()
    input.current.value = ''
    dialog.current.close()
  }

  const addTask = (e) => {
    e.preventDefault()
    updateProjects(
      projects.map(i => {
        if (i.name === selectTag.current.value) {
          return ({ name: i.name, tasks: [...i.tasks, { name: capitalize(input.current.value), date: dateFormat(date.current.value) }] })
        }
        else {
          return { ...i }
        }
      })
    )
    input.current.value = ''
    date.current.value = ''
    dialog.current.close()
  }

  const deleteTask = (e, item) => {
    e.stopPropagation()
    updateProjects(
      projects.map(i => {
        if (i.name === currentProject.name) {
          return ({ ...i, tasks: i.tasks.filter(task => task.name != item.name) })
        }
        else {
          return { ...i }
        }
      })
    )
  }

  useEffect(() => {
    selectTag.current && selectTag.current.value && setCurrentProject(projects.find(i => i.name === selectTag.current.value))
  }, [projects])

  return (
    currentProject ?
      <>
        <div id="main-div">
          <h1 id='project-name'>{currentProject.name}</h1>

          {
            currentProject.tasks && currentProject.tasks.length > 0 ?
              <div id="task-section">
                <h2 id="tasks-heading">Tasks</h2>
                <div id="tasks">
                  {
                    currentProject.tasks.map(item => {
                      return (
                        <div key={item.name} className='task' onMouseEnter={() => { setDisplay("inline") }} onMouseLeave={() => { setDisplay("none") }}>
                          <Checkbox {...label} />
                          <div className='task-name-date'>
                            <p>{item.name}</p>
                            <p>{item.date}</p>
                          </div>
                          <DeleteIcon className='delete-task' style={{ display: display }} onClick={(e) => { deleteTask(e, item) }} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              :
              <div id="empty-task">
                <h1>No Tasks</h1>
                <h1>Click "<AddIcon />" to add a task</h1>
              </div>
          }
          <Fab color="primary" aria-label="add" onClick={openTaskDialog} id="add-task">
            <AddIcon />
          </Fab>
        </div >

        <dialog ref={dialog} id='task-dialog'>
          <h1>Add Task</h1>
          <form onSubmit={(e) => { addTask(e) }}>
            <div id="name-input-div">
              <label htmlFor="task-name-input">Task Name</label>
              <input type="text" id="task-name-input" ref={input} placeholder='Title...' required />
            </div>
            <div id='date-project-div'>
              <div id='form-date-input'>
                <label htmlFor="task-date-input">Date</label>
                <input type="date" ref={date} id='task-date-input' required />
              </div>
              <div id='form-project-input'>
                <label htmlFor="projects-dropdown">Project</label>
                <select name="projects-dropdown" id="projects-dropdown" ref={selectTag}>
                  {
                    projects.map(project => {
                      return (
                        <option value={project.name} key={project.name}>{project.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
            <div id='taskform-buttons-div'>
              <Button variant='outlined' color='error' onClick={(e) => { closeTaskDialog(e) }}>Cancel</Button>
              <Button variant='contained' type='submit'>Add</Button>
            </div>
          </form>
        </dialog>
      </>
      : <div id="empty-projects">
        <h1>No Projects Ongoing!</h1>
        <h1>Click "<AddIcon />" to add one</h1>
      </div>
  )
}

export default Tasks