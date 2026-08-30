import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ListarDeportistas({ actualizar }) {
    const [datos, setDatos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listar();
    }, [actualizar]);

    async function listar() {
        let respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista", {
            method: "GET",
            headers: {
                Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                "Content-Type": "application/json"
            }
        });

        let res = await respuesta.json();
        setDatos(res);
    }

    async function eliminar(id) {
        let respuesta = await fetch("https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista?id=eq." + id, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                "Content-Type": "application/json"
            }
        });

        console.log(respuesta.ok);

        if (respuesta.ok) {
            alert("Deportista eliminado correctamente");
            listar();
        } else {
            alert("Error al eliminar el deportista");
        }
    }

    function irActualizar(id) {
        navigate("/actualizar/" + id);
    }

    return (
        <div>
            <h2>Lista de Deportistas</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Eliminar</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datos.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellido}</td>
                                <td>{item.edad}</td>
                                <td>
                                    <button onClick={() => eliminar(item.id)}>
                                        Eliminar
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => irActualizar(item.id)}>
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}