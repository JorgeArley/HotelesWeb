import { User } from "src/app/auth/interfaces/user";

export interface Booking {
  fecha_ingreso: string;
  fecha_salida: string;
  cantidad_personas: string;
  ciudad_destino: string;
  contacto_emergencia: string;
  tel_contacto: string;
  habitacion: string;
  huespedes?: User[]
}

export interface Bookingemail {
  reserva: string,
  email: string
}