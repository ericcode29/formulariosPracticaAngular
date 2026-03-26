import { Injectable, signal } from '@angular/core';
import { DatosTabla, Vehiculo } from '../interfaces/datosTabla.interface';
import { HomePage } from '../pages/homePage/homePage'

@Injectable({
  providedIn: 'root'
})
export class ObtenerDatosService {

  datos = signal<DatosTabla[]>([
    {
      usuario: 'Alfredo',
      empresa: 'Una cualquiera',
      cif: 'ABCD12345',
      telefono: 987654321,
      email: 'aflredo@uncualquiera.com',
      direccion: 'su calle',
      comercial: 'Agus',
      tipo: 'user',
      vehiculo: []
    },
    {
      usuario: 'Alfredo +',
      empresa: 'Una cualquiera',
      cif: 'ABCD12345',
      telefono: 987654321,
      email: 'aflredo@uncualquiera.com',
      direccion: 'su calle',
      comercial: 'Agus',
      tipo: 'user',
      vehiculo: [{
        vehiculo: '2801FTY',
        dispositivo: '112233A',
        tarjeta: '111222333R',
        estado: 'Aparcao',
        tipo: 'Camión',
        ultimaPosicion: {
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVVNKcWkl9e6q9st7loHTXZLfoPM-uroYj3w&s',
          alt: 'imagen google maps'
        }
      }]
    },
    {
      usuario: 'Alfredo',
      empresa: 'Una cualquiera',
      cif: 'ABCD12345',
      telefono: 987654321,
      email: 'aflredo@uncualquiera.com',
      direccion: 'su calle',
      comercial: 'Agus',
      tipo: 'user',
      vehiculo: []
    },
  ])

  filtro = signal('')
  historial = signal<Set<string>>(new Set(['']))
  clienteSeleccionado = signal<DatosTabla[]>([])
  indexClienteSeleccionado = signal<number>(0)
  vehiculoSeleccionado = signal<Vehiculo | null>(null)

  obtenerDatos(): DatosTabla[] {
    return this.datos()
  }

  addCliente(cliente: DatosTabla) {
    this.datos().push(cliente)
  }

  addHistorial(value: string) {
    this.historial.update(hist => new Set([...hist, value]))
  }


}
