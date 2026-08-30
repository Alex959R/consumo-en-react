import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CrearDeportista } from './deportistas/componentes/CrearDeportistas';
import { ActualizarDeportista } from './deportistas/componentes/ActualizarDeportistas';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<CrearDeportista />} 
                />
                <Route 
                    path="/actualizar/:id" 
                    element={<ActualizarDeportista />} 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;