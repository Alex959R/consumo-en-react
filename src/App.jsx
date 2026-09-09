import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CrearDeportista } from './componentes/CrearDeportistas';
import { ActualizarDeportista } from './componentes/ActualizarDeportistas';

function App() {
    return (
        <BrowserRouter>
            <Container className="py-4">
                <Routes>
                    <Route path="/" element={<CrearDeportista />} />
                    <Route path="/actualizar/:id" element={<ActualizarDeportista />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;