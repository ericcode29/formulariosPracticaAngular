import { InitEditableRow } from "primeng/table"

export interface DatosTabla {
    usuario: string,
    empresa: string,
    cif: string,
    telefono: number,
    email: string,
    direccion: string,
    comercial: string,
    tipo: string,
    vehiculo: Vehiculo[]
}

export interface Vehiculo {
    vehiculo: string,
    dispositivo: string,
    tarjeta: string,
    estado: string,
    tipo: string,
    ultimaPosicion: {
        src: string;
        alt: string;
    }
}