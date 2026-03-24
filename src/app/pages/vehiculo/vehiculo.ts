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
import { DatosTabla } from '../../interfaces/datosTabla.interface';
import { AddVehiculo } from '../../components/addVehiculo/addVehiculo';

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
export class Vehiculo {

  datosService = inject(ObtenerDatosService)
  dialog = inject(MatDialog)

  cliente = computed(() => {
    const seleccion = this.datosService.clienteSeleccionado()
    return seleccion[0]
  })

  vehiculo = computed(() => {
    return this.cliente()?.vehiculo
  })

  addVehiculo(cliente: DatosTabla) {
    console.log(cliente)
    this.dialog.open(AddVehiculo)
  }
}

