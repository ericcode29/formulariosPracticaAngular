import { Injectable, signal } from '@angular/core';
import { DatosTabla } from '../interfaces/datosTabla.interface';
import {HomePage} from '../pages/homePage/homePage'

@Injectable({
  providedIn: 'root'
})
export class ObtenerDatosService {

   private datos = signal<DatosTabla[]>([
    {
      usuario:'Alfredo',
      empresa: 'Una cualquiera',
      cif: 'ABCD1234',
      telefono:987654321,
      email: 'aflredo@uncualquiera.com',
      direccion: 'su calle',
      comercial: 'Agus',
      tipo:'user'
    },
    {
      usuario:'Alfredo',
      empresa: 'Una cualquiera',
      cif: 'ABCD1234',
      telefono:987654321,
      email: 'aflredo@uncualquiera.com',
      direccion: 'su calle',
      comercial: 'Agus',
      tipo:'user'
    },
    {
      usuario:'Alfredo',
      empresa: 'Una cualquiera',
      cif: 'ABCD1234',
      telefono:987654321,
      email: 'aflredo@uncualquiera.com',
      direccion: 'su calle',
      comercial: 'Agus',
      tipo:'user'
    } 
  ])

  filtro = signal('')

  obtenerDatos():DatosTabla[]{
    return this.datos()
  }

  addCliente(cliente:DatosTabla){
    this.datos().push(cliente)
  }


}
