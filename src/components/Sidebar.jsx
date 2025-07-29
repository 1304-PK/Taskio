import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import "../styles/Sidebar.css"

function Sidebar({ projects, updateProjects, setCurrentProject }) {

    const dialog = useRef(null)
    const input = useRef(null)

    const showDialog = () => {
        dialog.current.showModal()
    }

    const addProject = (e) => {
        e.preventDefault()
        updateProjects([...projects, { name: input.current.value, tasks: [] }])
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
                                    <button key={item.name} onClick={() => {
                                        renderCurrentProject(item)
                                    }}>{item.name}</button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <dialog ref={dialog}>
                <h1>Add Project</h1>
                <form>
                    <label htmlFor="project-name">Project Name</label>
                    <input type="text" ref={input} id="project-name" placeholder='Title' />
                    <button onClick={(e) => {
                        addProject(e)
                    }}>Submit</button>
                </form>
            </dialog>
        </>
    )
}

export default Sidebar