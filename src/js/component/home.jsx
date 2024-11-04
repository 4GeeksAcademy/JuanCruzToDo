import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const [tareas, setTareas] = useState("");
    const [listaTareas, setListaTareas] = useState([]);
    const [editarTarea, setEditarTarea] = useState(null);
    const [tareasGuardadas, setTareasGuardadas] = useState([]); // Estado para tareas guardadas

    const agregarTarea = () => {
        if (tareas.trim() === "") {
            alert("No se puede ingresar una tarea vacía");
            return;
        }

        if (editarTarea !== null) {
            const nuevasTareas = listaTareas.map((tarea, index) => 
                index === editarTarea ? tareas : tarea
            );
            setListaTareas(nuevasTareas);
            setEditarTarea(null);
        } else {
            // Agregar nueva tarea y marcarla como guardada (icono de candado abierto)
            setListaTareas([...listaTareas, tareas]);
            setTareasGuardadas([...tareasGuardadas, true]); // Añadir estado de guardado
        }

        setTareas("");
    };

    const eliminarTarea = (index) => {
        const nuevasTareas = listaTareas.filter((_, i) => i !== index);
        const nuevasTareasGuardadas = tareasGuardadas.filter((_, i) => i !== index); // Eliminar estado guardado
        setListaTareas(nuevasTareas);
        setTareasGuardadas(nuevasTareasGuardadas);
        
        if (editarTarea === index) {
            setEditarTarea(null);
            setTareas("");
        }
    };

    const iniciarEdicion = (index) => {
        setEditarTarea(index);
        setTareas(listaTareas[index]);
    };

    const pressEnter = (e) => {
        if (e.key === "Enter") {
            agregarTarea();
        }
    };

    const toggleGuardarTarea = (index) => {
        const nuevasTareasGuardadas = tareasGuardadas.map((guardada, i) => 
            i === index ? !guardada : guardada
        );
        setTareasGuardadas(nuevasTareasGuardadas);
    };

    return (
        <>
            <h1>Tareas Pendientes</h1>

            <div className="input-group mb-3" id="group">
                <input type="text" className="form-control" 
                    placeholder="Ingrese tarea" 
                    id="inputG"
                    value={tareas}
                    onChange={(e) => setTareas(e.target.value)}
                    onKeyPress={pressEnter}
                />
                <button className="btn btn-outline-secondary" 
                    type="button" 
                    id="button-addon2"
                    onClick={agregarTarea}
                >Add</button>
            </div>

            <div className="container">
                <ul className="list-group">
                    {listaTareas.length === 0 ? (
                        <li className="list-group-item" style={{ color: "#ec7744" }}>No hay tareas pendientes</li>
                    ) : (
                        listaTareas.map((tarea, index) => 
                            <li className="list-group-item" key={index} id="input">
                                {tarea}
                                <FontAwesomeIcon 
                                    icon={faPencil} 
                                    style={{ marginRight: '10px', color: "#ec7744", cursor: "pointer" }} 
                                    onClick={() => iniciarEdicion(index)} 
                                />
                                <FontAwesomeIcon 
                                    icon={tareasGuardadas[index] ? faLockOpen : faLock} 
                                    style={{ marginLeft: '10px', color: "#ec7744", cursor: "pointer" }} 
                                    onClick={() => toggleGuardarTarea(index)} 
                                />
                                <span style={{ cursor: "pointer", marginLeft: "10px", color: "#ec7744" }} 
                                    onClick={() => eliminarTarea(index)} id="span">
                                    X
                                </span>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </>
    );
};

export default Home;
