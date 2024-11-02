import { useState, useEffect } from "react";
import React  from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [tareas, setTareas] = useState("");
    const [listaTareas, setListaTareas] = useState([]);
    const [editarTarea, setEditarTarea] = useState(null);

    const agregarTarea = () => {
        // Validar si la tarea no está vacía
        if (tareas.trim() === "") {
            alert("No se puede ingresar una tarea vacía");
            return;
        }

        if (editarTarea !== null) {
            // Actualiza la tarea existente
            const nuevasTareas = listaTareas.map((tarea, index) => 
                index === editarTarea ? tareas : tarea
            );
            setListaTareas(nuevasTareas);
            setEditarTarea(null); // Reinicia el estado de edición
        } else {
            // Agregar una nueva tarea
            setListaTareas([...listaTareas, tareas]);
        }

        setTareas(""); // Limpia el input después de agregar
    };

    const eliminarTarea = (index) => {
        const nuevasTareas = listaTareas.filter((_, i) => i !== index);
        setListaTareas(nuevasTareas);
        // Reiniciar la edición si se elimina la tarea editada
        if (editarTarea === index) {
            setEditarTarea(null);
            setTareas("");
        }
    };

    const iniciarEdicion = (index) => {
        setEditarTarea(index); // Establece el índice de la tarea a editar
        setTareas(listaTareas[index]); // Prellena el campo de texto con la tarea
    };

    const pressEnter = (e) => {
        if (e.key === "Enter") {
            agregarTarea();
        }
    };

	




	


	
	return (
		<>

		<h1>Tareas Pendientes</h1>

		<div className="input-group mb-3" id="group">
 		 <input type="text" className="form-control" 
		 placeholder="Ingrese tarea" aria-label="Recipient's username" 
		 aria-describedby="button-addon2" 
		 id="inputG"
		 value={tareas}
		 onChange={(e) => setTareas (e.target.value)}
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
				{listaTareas.length === 0 ? ( <li className="list-group-item" style={{color: "#ec7744"}}>No hay tareas pendientes</li>) : (

				listaTareas.map((tarea , index)=> 
					
  				<li className="list-group-item" key={index} id="input">{tarea}

				<FontAwesomeIcon icon={faPencil} style={{ marginRight: '10px', color: "#ec7744", cursor: "pointer" }} onClick={() => iniciarEdicion(index)} />
				
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
