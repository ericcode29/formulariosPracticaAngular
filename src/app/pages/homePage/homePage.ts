import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatosTabla } from '../../interfaces/datosTabla.interface';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';
import { EditarCliente } from '../../components/editarCliente/editarCliente';
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


@Component({
  selector: 'app-home-page',
  imports: [TableModule, MatButtonModule],
  templateUrl: './homePage.html',
  styleUrl: './homePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  datosService = inject(ObtenerDatosService)
  dialog = inject(MatDialog)
  clienteSeleccionado = this.datosService.clienteSeleccionado
  index = this.datosService.indexClienteSeleccionado
  

  his = computed(() => {
    return this.datosService.historial()
  })
  
  datos = computed(() => {
    const filtro = this.datosService.filtro().toLocaleLowerCase()
    const dt = this.datosService.obtenerDatos()

    if (filtro === '') return dt

    return dt.filter(dato => {
      return dato.usuario.toLocaleLowerCase().includes(filtro) || dato.email.toLocaleLowerCase().includes(filtro) || dato.comercial.toLocaleLowerCase().includes(filtro) || dato.empresa.toLocaleLowerCase().includes(filtro)
    })
  })

  clickHistorial(value:string){
    this.datosService.filtro.set(value)
  }

  borrarHistorial(value:string){
    this.datosService.historial().delete(value)
  }

  getIndex(i:number){
    console.log(i)
  }

  editarCliente(cliente: DatosTabla){
    const index = this.datosService.datos().indexOf(cliente)
    this.clienteSeleccionado.set([cliente])
    this.index.set(index)
    this.dialog.open(EditarCliente, {width:'66%'})
  }
}


