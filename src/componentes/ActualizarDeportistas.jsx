import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function ActualizarDeportista() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    async function traerDatos() {
        let respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista?id=eq." + id, {
            method: "GET",
            headers: {
                Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                "Content-Type": "application/json"
            }
        });

        let res = await respuesta.json();
        console.log(res[0].nombre);
        
        setNombre(res[0].nombre);
        setApellido(res[0].apellido);
        setEdad(res[0].edad);
    }

    async function actualizar() {
        let respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista?id=eq." + id, {
            method: "PATCH",
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

        console.log(respuesta.ok);

        if (respuesta.ok) {
            navigate("/");
            alert("Deportista actualizado correctamente");
        } else {
            alert("Error al actualizar el deportista");
        }
    }

    useEffect(() => {
        traerDatos();
    }, []);

    return (
        <div>
            <h1>Actualizar Deportista</h1>
            
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
            
            <button onClick={actualizar}>Actualizar Deportista</button>
        </div>
    );
}