export interface User {
    id: number;
    user: string;
    email: string;
}

export interface Resident{
    nombre: string;
    apellidos: string;
    email: string;
    fecha_nacimiento: string;
    genero: string;
    tipo_documento: string;
    doc_user: string;
    telefono: string;
    password: string;
}