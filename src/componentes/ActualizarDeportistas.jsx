import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useSwal } from '../hooks/useSwall.ts';

export function ActualizarDeportista() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(true);
    const [mensaje, setMensaje] = useState(null);
    const [tipoMensaje, setTipoMensaje] = useState('');
    
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const { showSuccess, showError, showLoading, close } = useSwal();

    useEffect(() => {
        const traerDatos = async () => {
            try {
                const respuesta = await fetch(`https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista?id=eq.${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                        apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                        "Content-Type": "application/json"
                    }
                });

                const res = await respuesta.json();
                
                if (res && res.length > 0) {
                    setNombre(res[0].nombre || "");
                    setApellido(res[0].apellido || "");
                    setEdad(res[0].edad || 0);
                } else {
                    setMensaje('❌ No se encontró el deportista');
                    setTipoMensaje('danger');
                }
            } catch (error) {
                setMensaje('❌ Error al cargar los datos');
                setTipoMensaje('danger');
            }
            setCargandoDatos(false);
        };

        traerDatos();
    }, [id]);

    const handleActualizar = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !apellido.trim()) {
            setMensaje('⚠️ Por favor, completa todos los campos');
            setTipoMensaje('danger');
            setTimeout(() => setMensaje(null), 3000);
            return;
        }

        setCargando(true);
        showLoading('Actualizando deportista...');

        try {
            const respuesta = await fetch(`https://mcylhpmszpjvcohpzqgy.supabase.co/rest/v1/deportista?id=eq.${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: "Bearer sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    apikey: "sb_publishable_zs2-l26AfApBbamfG8vxDA_hDYLVlCT",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    apellido: apellido.trim(),
                    edad: parseInt(String(edad)) || 0
                })
            });

            close();
            setCargando(false);

            if (respuesta.ok) {
                setMensaje('✅ Deportista actualizado correctamente');
                setTipoMensaje('success');
                showSuccess('✅ Deportista actualizado correctamente');
                setTimeout(() => navigate('/'), 1500);
            } else {
                setMensaje('❌ Error al actualizar el deportista');
                setTipoMensaje('danger');
                showError('❌ Error al actualizar el deportista');
            }
        } catch (error) {
            close();
            setCargando(false);
            setMensaje('❌ Error de conexión con el servidor');
            setTipoMensaje('danger');
            showError('❌ Error de conexión con el servidor');
        }

        setTimeout(() => setMensaje(null), 3000);
    };

    if (cargandoDatos) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2 text-muted">Cargando datos...</p>
            </div>
        );
    }

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title className="h2 mb-4">
                    ✏️ Actualizar Deportista
                </Card.Title>
                
                <p className="text-muted">Actualizando ID: <strong>{id}</strong></p>

                {mensaje && (
                    <Alert variant={tipoMensaje} dismissible onClose={() => setMensaje(null)}>
                        {mensaje}
                    </Alert>
                )}

                <Form onSubmit={handleActualizar}>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold">👤 Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Juan"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    disabled={cargando}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold">📛 Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Pérez"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    disabled={cargando}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group>
                                <Form.Label className="fw-semibold">🎂 Edad</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ej: 25"
                                    value={edad}
                                    onChange={(e) => setEdad(Number(e.target.value))}
                                    disabled={cargando}
                                    min="1"
                                    max="120"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex gap-2">
                        <Button type="submit" variant="success" disabled={cargando}>
                            {cargando ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                                    Actualizando...
                                </>
                            ) : (
                                '💾 Actualizar'
                            )}
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/')}>
                            ↩️ Cancelar
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}