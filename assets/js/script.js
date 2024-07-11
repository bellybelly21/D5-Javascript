document.addEventListener('DOMContentLoaded', function () {
    const tareaInput = document.getElementById('tareas');
    const btn = document.getElementById('agregar-btn');
    const lista = document.getElementById('lista');
    const totalTareasElem = document.getElementById('total-tareas');
    const tareasCompletadasElem = document.getElementById('tareas-completadas');

    const tareas = [
        { id: 1, nombre: 'Lavar la loza', estado: true },
        { id: 2, nombre: 'Sacar la basura', estado: false },
        { id: 3, nombre: 'Ordenar el mueble', estado: false }
    ];

    btn.addEventListener('click', function(){
        agregarElemento();
        renderElementos();
    });

    function agregarElemento(){
        if (tareaInput.value.trim() === '') return;

        const nuevaTarea = {
            id: Date.now(),
            nombre: tareaInput.value,
            estado: false
        };
        tareas.push(nuevaTarea);
        tareaInput.value = ''; 
    }

    function renderElementos(){
        lista.innerHTML = '';
        tareas.forEach(tarea => {
            lista.innerHTML += `
                <li>
                    <span class="task-id">#${tarea.id}</span>
                    <input type="checkbox" onclick="completarTarea(${tarea.id})" ${tarea.estado ? 'checked' : ''}>
                    <span class="${tarea.estado ? 'completed' : ''}">${tarea.nombre}</span>
                    <button onclick="borrarElemento(${tarea.id})">Borrar</button>
                </li>
            `;
        });
        actualizarContadores();
    }

    function borrarElemento(id){
        const index = tareas.findIndex(tarea => tarea.id === id);
        tareas.splice(index, 1);
        renderElementos();
    }

    function completarTarea(id){
        const tarea = tareas.find(tarea => tarea.id === id);
        tarea.estado = !tarea.estado;
        renderElementos();
    }

    function actualizarContadores(){
        totalTareasElem.textContent = tareas.length;
        const tareasCompletadas = tareas.filter(tarea => tarea.estado).length;
        tareasCompletadasElem.textContent = tareasCompletadas;
    }


    window.borrarElemento = borrarElemento;
    window.completarTarea = completarTarea;


    renderElementos();
});