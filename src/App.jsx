import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CrearDeportista } from './componentes/CrearDeportistas';
import { ActualizarDeportista } from './componentes/ActualizarDeportistas';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CrearDeportista />} />
                <Route path="/actualizar/:id" element={<ActualizarDeportista />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;