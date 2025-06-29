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
const projInput = document.getElementById('project-name-input')
const taskInput = document.getElementById('task-name-input')
const selectTag = document.getElementById('project-options')

function init() {
    const initialProj = new createProject('Default Project')
    projects.push(initialProj)
    initialProj.tasks.push('Task 1')
    initialProj.tasks.push('Task 2')
    renderMainContainer()
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

}

function renderMainContainer() {
    projects.forEach((project) => {
        mainContainer.innerHTML = ''

        const proj_name = document.createElement('h1')
        proj_name.textContent = project.name

        const taskSection = document.createElement('div')
        taskSection.className = 'task-section'

        const taskHeading = document.createElement('p')
        taskHeading.className = 'task-heading'
        taskHeading.textContent = 'Tasks'
        taskSection.append(taskHeading)

        project.tasks.forEach((task) => {
            const tasks = document.createElement("div")
            tasks.className = 'task'

            const taskDetails = document.createElement('div')
            taskDetails.className = 'task-details'
            const taskName = document.createElement('div')
            taskName.className = 'task-name'

            const input = document.createElement('input')
            input.type = 'checkbox'
            const span = document.createElement('span')
            span.textContent = task
            taskName.append(input, span)

            // const dateTime = document.createElement('div')
            // dateTime.textContent = 'DATE AND TIME'

            taskDetails.append(taskName)
            tasks.append(taskDetails)

            taskSection.append(tasks)
        })


        mainContainer.append(proj_name, taskSection)
    })
}

// PROJECT DIALOG

addProjBtn.addEventListener('click', () => {
    projDialog.showModal()
})

document.getElementById('project-dialog-add-button').addEventListener('click', (e) => {
    e.preventDefault()

    const proj = new createProject(projInput.value)
    projects.push(proj)
    renderMainContainer()

    projDialog.close()
})

// TASK DIALOG

addTaskBtn.addEventListener('click', () => {
    updateTaskDialog()
    taskDialog.showModal()
})

document.getElementById('task-dialog-add-button').addEventListener('click', (e) => {
    e.preventDefault()

    projects.forEach((project) => {
        if (project.name === selectTag.value) {
            project.tasks.push(taskInput.value)
        }
    })

    renderMainContainer()
    taskDialog.close()
})

init()