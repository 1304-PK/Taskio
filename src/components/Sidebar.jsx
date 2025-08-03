import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import "../styles/Sidebar.css"

function Sidebar({ projects, updateProjects, setCurrentProject }) {

    const dialog = useRef(null)
    const input = useRef(null)

    const [sidebar, setSidebar] = useState(false)
    const [sidebarClass, setSidebarClass] = useState('')

    const capitalize = (word) => {
        return (word[0].toUpperCase() + word.slice(1))
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
        if (projects.length === 1) {
            setCurrentProject()
        }
        updateProjects(
            projects.filter(i => i.name != item.name)
        )
    }

    const handleWindowResize = () => {
        if (window.innerWidth >= 1000) {
            setSidebarClass('')
        }
        else if (window.innerWidth < 1000) {
            sidebar ? setSidebarClass('show-sidebar') : setSidebarClass('hide-sidebar')
        }
    }

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [sidebar])

    const toggleSidebar = () => {
        setSidebar(prev => !prev)
    }

    return (
        <>
            <div id="sidebar" className={sidebarClass}>
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
                                        <DeleteIcon className="delete-project" onClick={(e) => { deleteProject(e, item) }} />
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
                <DensityMediumIcon id="sidebar-icon" onClick={toggleSidebar} />
            </div>

            <dialog ref={dialog} id="project-dialog">
                <h1>Add Project</h1>
                <form onSubmit={(e) => addProject(e)}>
                    <div id="input-label-div">
                        <label htmlFor="project-name">Project Name</label>
                        <input type="text" ref={input} id="project-name" placeholder='Title...' required />
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