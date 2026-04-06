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
import { VehiculoCard } from "../../components/vehiculoCard/vehiculoCard";
import { VehiculoTabla } from "../../components/vehiculoTabla/vehiculoTabla";

@Component({
  selector: 'app-vehiculo',
  imports: [
    RouterLink,
    MatMiniFabButton,
    MatCardModule,
    VehiculoCard,
    VehiculoTabla
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

}

