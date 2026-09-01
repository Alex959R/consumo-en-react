import { useState } from "react";
import { ListarDeportistas } from "./ListarDeportistas";
import { useSwal } from '../hooks/useSwall';

export function CrearDeportista() {
    // Estados del formulario
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    const [actualizar, setActualizar] = useState(0);
    
    const { showLoading, showSuccess, showError, close } = useSwal();

      const mostrarLoading = () => {
        MySwal.fire({
            title: 'Guardando deportista...',
            didOpen: () => MySwal.showLoading(),
            allowOutsideClick: false,
            showConfirmButton: false,
        });
    };

    async function guardar() {
        // Validar campos
        if (!nombre.trim() || !apellido.trim()) {
            showError('⚠️ Por favor, completa todos los campos');
            return;
        }

        // Mostrar loading
        showLoading('Guardando deportista...');

        try {
            const datos = {
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                edad: parseInt(String(edad)) || 0
            };

            const respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista", {
                method: "POST",
                headers: {
                    Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            close();

            if (respuesta.status === 201) {
                showSuccess('✅ Deportista guardado correctamente');
                
                // Limpiar campos
                setNombre("");
                setApellido("");
                setEdad(0);
                setActualizar(actualizar + 1);
            } else {
                showError('❌ Error al guardar el deportista');
            }

        } catch (error) {
            close();
            showError('❌ Error de conexión con el servidor');
        }
    }

    return (
        <div className="card">
            <h1>Registrar Deportista</h1>
            
            <div className="form-group">
                <div className="input-wrapper">
                    <label>👤 Nombre</label>
                    <input 
                        placeholder="Ej: Juan" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                
                <div className="input-wrapper">
                    <label>📛 Apellido</label>
                    <input 
                        placeholder="Ej: Pérez" 
                        value={apellido} 
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                
                <div className="input-wrapper">
                    <label>🎂 Edad</label>
                    <input 
                        placeholder="Ej: 25" 
                        value={edad} 
                        onChange={(e) => setEdad(Number(e.target.value))}
                        type="number"
                        min="1"
                        max="120"
                    />
                </div>
            </div>
            
            <button className="btn btn-primary" onClick={guardar}>
                💾 Guardar Deportista
            </button>
            
            <ListarDeportistas actualizar={actualizar} />
        </div>
    );
}