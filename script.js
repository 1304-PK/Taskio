const projects = []

class createProject {
    constructor(name = 'Default Project') {
        this.name = name
        this.tasks = []
    }
}

// HTML ELEMENTS

const mainContainer = document.getElementById('main-container')
const addProjBtn = document.getElementById('add-project')
const addTaskBtn = document.getElementById('add-task')
const projDialog = document.getElementById('project-dialog')
const taskDialog = document.getElementById('task-dialog')
const editTaskDialog = document.getElementById('edit-task-dialog')
const projInput = document.getElementById('project-name-input')
const taskInput = document.getElementById('task-name-input')
const selectTag = document.getElementById('project-options')
const taskDate = document.getElementById('task-date')
const editTaskName = document.getElementById('edit-task-input')
const toggleSidebar = document.getElementById('toggle-sidebar')
const sideBar = document.getElementById('side-bar')

function init() {
    const initialProj = new createProject('Default Project')
    projects.push(initialProj)
    initialProj.tasks.push({name: 'Task 1', date: '12/04/2025'})
    initialProj.tasks.push({name: 'Task 2', date: '13/04/2025'})
    updateSidebarProjects()
    renderMainContainer(initialProj)
}

function updateTaskDialog() {
    selectTag.innerHTML = ''
    projects.forEach((project) => {
        const option = document.createElement('option')
        option.textContent = project.name
        selectTag.append(option)
    })
}

function updateSidebarProjects() {
    const projContainer = document.getElementById('sidebar-projects')
    projContainer.innerHTML = ''
    projects.forEach((project, index) => {
        const btn = document.createElement('button')
        btn.className = 'project'
        const p = document.createElement('p')
        p.textContent = project.name
        const delProjBtn = document.createElement('button')
        delProjBtn.className = 'delete-proj-button'
        delProjBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

        delProjBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            projects.splice(index, 1)
            renderMainContainer(projects[0])
            updateSidebarProjects()
        })

        btn.append(p, delProjBtn)

        btn.addEventListener('click', () => {
            renderMainContainer(project)
        })
        projContainer.append(btn)
    })
}

function renderMainContainer(project) {
    mainContainer.innerHTML = ''

    const proj_name = document.createElement('h1')
    proj_name.textContent = project.name

    const taskSection = document.createElement('div')
    taskSection.className = 'task-section'

    const taskHeading = document.createElement('p')
    taskHeading.className = 'task-heading'
    taskHeading.textContent = 'Tasks'
    taskSection.append(taskHeading)

    project.tasks.forEach((task, index) => {
        const tasks = document.createElement("div")
        tasks.className = 'task'

        const taskBtns = document.createElement('div')
        taskBtns.id = 'task-buttons-div'
        const infoBtn = document.createElement('button')
        infoBtn.id = 'task-info-button'



        infoBtn.innerHTML = '<i class="fa-solid fa-info"></i>'
        const editBtn = document.createElement('button')
        editBtn.id = 'task-edit-button'
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'

        // editBtn.addEventListener('click', () => {
        //     editTaskDialog.showModal()
        // })

        // document.getElementById('edit-task-submit-button').addEventListener('click', (e) => {
        //     e.preventDefault()
        //     console.log(index)
        // })

        const deleteBtn = document.createElement('button')
        deleteBtn.id = 'task-delete-button'
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

        deleteBtn.addEventListener('click', () => {
            project.tasks.splice(index, 1)
            renderMainContainer(project)
        })

        taskBtns.append(infoBtn, editBtn, deleteBtn)

        const taskDetails = document.createElement('div')
        taskDetails.className = 'task-details'
        const taskName = document.createElement('div')
        taskName.className = 'task-name'

        const input = document.createElement('input')
        input.type = 'checkbox'

        input.addEventListener('click', () => {
            if (input.checked === true) {
                tasks.classList.add('checked')
            }
            else {tasks.classList.remove('checked')}
        })

        const span = document.createElement('span')
        span.textContent = task.name
        taskName.append(input, span)

        const taskDateDiv = document.createElement('div')
        taskDateDiv.textContent = task.date

        taskDetails.append(taskName, taskDateDiv)
        tasks.append(taskDetails, taskBtns)

        taskSection.append(tasks)
    })

    mainContainer.append(proj_name, taskSection)
}

// PROJECT DIALOG

addProjBtn.addEventListener('click', () => {
    projDialog.showModal()
})

document.getElementById('project-dialog-add-button').addEventListener('click', (e) => {
    e.preventDefault()

    if (projInput.value){
    const proj = new createProject(projInput.value)
    projects.push(proj)
    updateSidebarProjects()
    renderMainContainer(proj)
    projInput.value = ''
    projDialog.close()
    }
    else{alert('Project name cannot be empty')}
})

document.getElementById('project-dialog-close-button').addEventListener('click', (e) => {
    e.preventDefault()
    projInput.value = ''
    projDialog.close()
})

// TASK DIALOG

addTaskBtn.addEventListener('click', () => {
    updateTaskDialog()
    taskDialog.showModal()
})

document.getElementById('task-dialog-add-button').addEventListener('click', (e) => {
    e.preventDefault()

    if (taskInput.value) {
        let date = taskDate.value.split('-')
        date = `${date[2]}/${date[1]}/${date[0]}`
        projects.forEach((project) => {
            if (project.name === selectTag.value) {
                project.tasks.push({
                    name: taskInput.value,
                    date: date
                })
                renderMainContainer(project)
            }
        })
        taskInput.value = ''
        taskDialog.close()
    }
    else{alert('Task name cannot be empty')}
})

document.getElementById('task-dialog-close-button').addEventListener('click', (e) => {
    e.preventDefault()
    taskInput.value = ''
    taskDialog.close()
})

let toggled = false
toggleSidebar.addEventListener('click', () => {
    if (toggled === false) {
        sideBar.style.transform = 'translateX(0)'
        toggled = true
    }
    else {
        sideBar.style.transform = 'translateX(-60vw)'
        toggled = false
    }
})

init()