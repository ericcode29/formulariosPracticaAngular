import { Component, computed, inject } from '@angular/core';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';
import { RouterLink } from "@angular/router";
import { MatMiniFabButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DatosTabla, Vehiculo } from '../../interfaces/datosTabla.interface';
import { AddVehiculo } from '../../components/addVehiculo/addVehiculo';
import { EditarVehiculo } from '../../components/editarVehiculo/editarVehiculo';
import { ConfirmarEliminar } from '../../components/confirmarEliminar/confirmarEliminar';
import { tap } from 'rxjs';

@Component({
  selector: 'app-vehiculo',
  imports: [
    RouterLink,
    MatMiniFabButton,
    MatCardModule,
  ],
  templateUrl: './vehiculo.html',
  styleUrl: './vehiculo.css',
})
export class VehiculoPage {

  datosService = inject(ObtenerDatosService)
  dialog = inject(MatDialog)

  cliente = computed(() => {
    const seleccion = this.datosService.clienteSeleccionado()
    return seleccion[0]
  })

  addVehiculo(cliente: DatosTabla) {
    this.dialog.open(AddVehiculo)
  }

  editar(v: Vehiculo) {
    this.datosService.vehiculoSeleccionado.set(v);
    this.dialog.open(EditarVehiculo);
  }

  eliminarVehiculo(v: Vehiculo) {

    const dialog = this.dialog.open(ConfirmarEliminar)

    dialog.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        const vehiculos = this.cliente().vehiculo.filter(i => i != v)
        this.datosService.clienteSeleccionado()[0].vehiculo = vehiculos

        this.datosService.clienteSeleccionado.update(datos => [...datos])
      }
    })



  }
}

