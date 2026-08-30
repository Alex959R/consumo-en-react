import { useState } from "react";
import { ListarDeportistas } from "./ListarDeportistas";

export function CrearDeportista() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    const [actualizar, setActualizar] = useState(0);

    async function guardar() {
        let respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista", {
            method: "POST",
            headers: {
                Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                nombre: nombre, 
                apellido: apellido,
                edad: edad 
            })
        });

        console.log(respuesta);

        if (respuesta.status === 201) {
            alert("Deportista guardado correctamente");
        } else {
            alert("Error al guardar el deportista");
        }

        setNombre("");
        setApellido("");
        setEdad(0);
        setActualizar(actualizar + 1);
    }

    return (
        <div>
            <h1>Registrar Deportista</h1>
            
            <input 
                placeholder="Escribe el nombre" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
            />
            
            <input 
                placeholder="Escribe el apellido" 
                value={apellido} 
                onChange={(e) => setApellido(e.target.value)}
            />
            
            <input 
                placeholder="Escribe la edad" 
                value={edad} 
                onChange={(e) => setEdad(e.target.value)}
            />
            
            <button onClick={guardar}>Guardar Deportista</button>
            
            <ListarDeportistas actualizar={actualizar} />
        </div>
    );
}