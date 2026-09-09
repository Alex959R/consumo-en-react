import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSwal } from '../hooks/useSwall.ts';
import { Table, Button, Badge, Spinner, Alert, ButtonGroup } from 'react-bootstrap';

export function ListarDeportistas({ actualizar }) {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { confirmDelete, showSuccess, showError, showLoading, close } = useSwal();

    useEffect(() => {
        listar();
    }, [actualizar]);

    async function listar() {
        setCargando(true);
        setError(null);
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
            setError('Error al cargar los datos');
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
            <div className="text-center py-4">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Cargando deportistas...</p>
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (datos.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                📭 No hay deportistas registrados
            </Alert>
        );
    }

    return (
        <>
            <h2 className="h4 mb-3">📋 Lista de Deportistas</h2>
            
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>👤 Nombre</th>
                        <th>📛 Apellido</th>
                        <th>🎂 Edad</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td><strong>{item.nombre}</strong></td>
                            <td>{item.apellido}</td>
                            <td>
                                <Badge bg="primary">{item.edad} años</Badge>
                            </td>
                            <td className="text-center">
                                <ButtonGroup size="sm">
                                    <Button 
                                        variant="warning" 
                                        onClick={() => irActualizar(item.id)}
                                    >
                                        ✏️ Editar
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        onClick={() => eliminar(item.id, item.nombre, item.apellido)}
                                    >
                                        🗑️ Eliminar
                                    </Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}