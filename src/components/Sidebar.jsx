import { useState, useRef } from "react"
import "../styles/Sidebar.css"

function Sidebar({projects, updateProjects}) {

    const dialog = useRef(null)
    const input = useRef(null)

    const showDialog = () => {
        dialog.current.showModal()
    }

    const addProject = (e) => {
        e.preventDefault()
        updateProjects([...projects, {name: input.current.value}])
        dialog.current.close()
    }

    return (
        <>
        <div id="sidebar">
            <h1>To-Do List</h1>
            <div id="project-section">
                <div id="project-heading">
                    <p>Projects</p>
                    <button onClick={showDialog}>+</button>
                </div>
                <div id="projects">
                    {
                        projects.map(item => {
                            return(
                                <button key={item.name}>{item.name}</button>
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
                <input type="text" ref={input} id="project-name" placeholder='Title'/>
                <button onClick={(e) => {
                    addProject(e)
                }}>Submit</button>
            </form>
        </dialog>
        </>
    )
}

export default Sidebar