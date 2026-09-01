// Definición de tipos para el proyecto

export interface Deportista {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
}

export interface DeportistaFormData {
    nombre: string;
    apellido: string;
    edad: number;
}

export interface ApiResponse {
    message?: string;
    error?: string;
}