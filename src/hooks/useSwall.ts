import { useCallback } from 'react';
import MySwal from '../lib/swal';

export const useSwal = () => {
    
    const confirmDelete = useCallback(async (nombre: string, apellido: string) => {
        const result = await MySwal.fire({
            title: '¿Estás seguro?',
            html: `
                <p>Vas a eliminar a <strong>${nombre} ${apellido}</strong></p>
                <p style="color: #e53e3e;">Esta acción no se puede deshacer.</p>
            `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        });
        return result.isConfirmed;
    }, []);

    const showSuccess = useCallback((message: string) => {
        MySwal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: message,
            timer: 2000,
            showConfirmButton: false,
        });
    }, []);

    const showError = useCallback((message: string) => {
        MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            confirmButtonColor: '#e53e3e',
        });
    }, []);

    const showLoading = useCallback((title = 'Procesando...') => {
        MySwal.fire({
            title: title,
            didOpen: () => MySwal.showLoading(),
            allowOutsideClick: false,
            showConfirmButton: false,
        });
    }, []);

    const close = useCallback(() => {
        MySwal.close();
    }, []);

    return {
        confirmDelete,
        showSuccess,
        showError,
        showLoading,
        close
    };
};