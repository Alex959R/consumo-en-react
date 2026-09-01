import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwal } from '../hooks/useSwall';

export function ListarDeportistas({ actualizar }) {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    const { confirmDelete, showSuccess, showError, showLoading, close } = useSwal();

    useEffect(() => {
        listar();
    }, [actualizar]);

    async function listar() {
        setCargando(true);
        try {
            const respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista", {
                method: "GET",
                headers: {
                    Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    "Content-Type": "application/json"
                }
            });

            const res = await respuesta.json();
            setDatos(res);
        } catch (error) {
            showError('❌ Error al cargar la lista de deportistas');
        }
        setCargando(false);
    }

    async function eliminar(id, nombre, apellido) {
        const confirmed = await confirmDelete(nombre, apellido);
        if (!confirmed) return;

        showLoading('Eliminando deportista...');

        try {
            const respuesta = await fetch(`https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista?id=eq.${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    "Content-Type": "application/json"
                }
            });

            close();

            if (respuesta.ok) {
                showSuccess(`✅ ${nombre} ${apellido} eliminado correctamente`);
                listar();
            } else {
                showError('❌ Error al eliminar el deportista');
            }

        } catch (error) {
            close();
            showError('❌ Error de conexión con el servidor');
        }
    }

    function irActualizar(id) {
        navigate(`/actualizar/${id}`);
    }

    if (cargando) {
        return (
            <div className="card" style={{marginTop: '30px'}}>
                <h2>Lista de Deportistas</h2>
                <div className="empty-state">
                    <div className="icon">⏳</div>
                    <p>Cargando deportistas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card" style={{marginTop: '30px'}}>
            <h2>Lista de Deportistas</h2>
            
            {datos.length === 0 ? (
                <div className="empty-state">
                    <div className="icon">📭</div>
                    <p>No hay deportistas registrados</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>👤 Nombre</th>
                                <th>📛 Apellido</th>
                                <th>🎂 Edad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><strong>{item.nombre}</strong></td>
                                    <td>{item.apellido}</td>
                                    <td>{item.edad} años</td>
                                    <td>
                                        <div className="acciones">
                                            <button 
                                                className="btn btn-warning btn-sm"
                                                onClick={() => irActualizar(item.id)}
                                            >
                                                ✏️ Editar
                                            </button>
                                            <button 
                                                className="btn btn-danger btn-sm"
                                                onClick={() => eliminar(item.id, item.nombre, item.apellido)}
                                            >
                                                🗑️ Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}