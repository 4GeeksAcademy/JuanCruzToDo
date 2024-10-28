import { useState, useEffect } from "react";
import React  from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [tareas , setTareas] = useState("");
	const [listaTareas, setListaTareas] = useState([]);
	
	let contador = 0;

	const agregarTarea = () => {
        // Validar si la tarea no está vacía
        if (tareas.trim() === "") {
            alert("No se puede ingresar una tarea vacía");
            return;
        }

		setListaTareas([...listaTareas, tareas]);
		setTareas("")// limpia el input despues de agregar

	};
	const eliminarTarea = (index) => {
		const nuevastareas = listaTareas.filter((_, i) => i !== index);
		setListaTareas(nuevastareas);
	}

	const pressEnter = (e) => {
		if (e.key === "Enter"){
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
				{listaTareas.length === 0 ? ( <li className="list-group-item">No hay tareas pendientes</li>) : (

				listaTareas.map((tarea , index)=> 
  				<li className="list-group-item" key={index} id="input">{tarea}
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
