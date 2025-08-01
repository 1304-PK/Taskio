import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button"
import "../styles/Sidebar.css"

function Sidebar({ projects, updateProjects, setCurrentProject }) {

    const dialog = useRef(null)
    const input = useRef(null)

    const capitalize = (word) => {
        return(word[0].toUpperCase() + word.slice(1))
    }

    const showDialog = () => {
        dialog.current.showModal()
    }

    const closeDialog = (e) => {
        e.preventDefault()
        input.current.value = ''
        dialog.current.close()
    }

    const addProject = (e) => {
        e.preventDefault()
        updateProjects([...projects, { name: capitalize(input.current.value), tasks: [] }])
        dialog.current.close()
    }

    useEffect(() => {
        input.current.value && setCurrentProject(projects.find(i => i.name === input.current.value))
        input.current.value = ''
    }, [projects])

    const renderCurrentProject = (item) => {
        setCurrentProject(
            projects.find(i => i.name === item.name)
        )
    }

    const deleteProject = (e, item) => {
        e.stopPropagation()
        if (projects.length === 1){
            setCurrentProject()
        }        
        updateProjects(
            projects.filter(i => i.name != item.name)
        )
    }

    return (
        <>
            <div id="sidebar">
                <h1>To-Do List</h1>
                <div id="project-section">
                    <div id="project-heading">
                        <p>Projects</p>
                        <button onClick={showDialog}><FontAwesomeIcon icon={faPlus} /></button>
                    </div>
                    <div id="projects">
                        {
                            projects.map(item => {
                                return (
                                    <button key={item.name} className="project-button" onClick={() => {
                                        renderCurrentProject(item)
                                    }}>
                                        {item.name}
                                        <DeleteIcon className="delete-project" onClick={(e) => {deleteProject(e, item)}}/>
                                        </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <dialog ref={dialog} id="project-dialog">
                <h1>Add Project</h1>
                <form onSubmit={(e) => addProject(e)}>
                    <div id="input-label-div">
                        <label htmlFor="project-name">Project Name</label>
                        <input type="text" ref={input} id="project-name" placeholder='Title...' required/>
                    </div>
                    <div id="projectform-buttons-div">
                        <Button variant="outlined" color="error" onClick={(e) => { closeDialog(e) }}>Cancel</Button>
                        <Button variant="contained" type="submit">Add</Button>
                    </div>
                </form>
            </dialog>
        </>
    )
}

export default Sidebar