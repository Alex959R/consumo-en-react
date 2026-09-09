import { useState } from "react";
import { ListarDeportistas } from "./ListarDeportistas";
import { useSwal } from '../hooks/useSwall.ts';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

export function CrearDeportista() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState(0);
    const [actualizar, setActualizar] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [tipoMensaje, setTipoMensaje] = useState('');
    
    const { showLoading, showSuccess, showError, close } = useSwal();

    async function guardar() {
        if (!nombre.trim() || !apellido.trim()) {
            showError('⚠️ Por favor, completa todos los campos');
            return;
        }

        setCargando(true);
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
            setCargando(false);

            if (respuesta.status === 201) {
                setMensaje('✅ Deportista guardado correctamente');
                setTipoMensaje('success');
                showSuccess('✅ Deportista guardado correctamente');
                
                setNombre("");
                setApellido("");
                setEdad(0);
                setActualizar(actualizar + 1);
            } else {
                setMensaje('❌ Error al guardar el deportista');
                setTipoMensaje('danger');
                showError('❌ Error al guardar el deportista');
            }

        } catch (error) {
            close();
            setCargando(false);
            setMensaje('❌ Error de conexión con el servidor');
            setTipoMensaje('danger');
            showError('❌ Error de conexión con el servidor');
        }

        setTimeout(() => setMensaje(null), 3000);
    }

    return (
        <Card className="shadow-sm mb-4">
            <Card.Body>
                <Card.Title className="h2 mb-4">
                    🏃 Registrar Deportista
                </Card.Title>

                {mensaje && (
                    <Alert variant={tipoMensaje} dismissible onClose={() => setMensaje(null)}>
                        {mensaje}
                    </Alert>
                )}

                <Form onSubmit={(e) => { e.preventDefault(); guardar(); }}>
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

                    <Button type="submit" variant="primary" disabled={cargando} className="w-100">
                        {cargando ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" className="me-2" />
                                Guardando...
                            </>
                        ) : (
                            '💾 Guardar Deportista'
                        )}
                    </Button>
                </Form>

                <hr className="my-4" />
                <ListarDeportistas actualizar={actualizar} />
            </Card.Body>
        </Card>
    );
}