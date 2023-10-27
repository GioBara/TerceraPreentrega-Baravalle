/*Variables */
const listaT = document.getElementById("lista-tareas");
const input = document.getElementById("input");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();
const form = document.getElementById("formulario");

let lTareas = {}

/*JSON y almacenamiento*/
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('tareas')) {
        lTareas = JSON.parse(localStorage.getItem('tareas'))
    }
    pintarTareas()
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    setTarea(e)
})

listaT.addEventListener("click", (e) => {
    btnAccion(e)
})

const setTarea = (e) => {
    if (input.value.trim() === '') {
        console.log('Error, porfavor ingrese nuevamente')
        return
    }
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    lTareas[tarea.id] = tarea
    form.reset()
    input.focus()
    pintarTareas()
}

const pintarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(lTareas))

    if (Object.values(lTareas).length === 0) {
        listaT.innerHTML = `
        <div class= "alert alert-dark">
            Ingrese una nueva tarea. 
        </div>`
        return
    }
    listaT.innerHTML = ''
    Object.values(lTareas).forEach(tarea => {
        const clon = template.cloneNode(true)
        clon.querySelector('p').textContent = tarea.texto
        if (tarea.estado) {
            clon.querySelector('.alert').classList.replace('alert-warning', 'alert-success')
            clon.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clon.querySelector('p').style.textDecoration = 'line-through'
        }
        clon.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clon.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clon)
    })
    listaT.appendChild(fragment)
}

const btnAccion = (e) => {
    if (e.target.classList.contains('fa-check-circle')) {
        lTareas[e.target.dataset.id].estado = true
        pintarTareas()
    }
    if (e.target.classList.contains('fa-minus-circle')) {
        delete lTareas[e.target.dataset.id]
        pintarTareas()
    }
    if (e.target.classList.contains('fa-undo-alt')) {
        lTareas[e.target.dataset.id].estado = false
        pintarTareas()
    }
    e.stopPropagation()
}