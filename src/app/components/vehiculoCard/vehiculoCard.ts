import { Component, inject, input } from '@angular/core';
import { MatCardFooter, MatCard, MatCardModule } from "@angular/material/card";
import { ObtenerDatosService } from '../../services/obtenerDatos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarVehiculo } from '../editarVehiculo/editarVehiculo';
import { Vehiculo } from '../../interfaces/datosTabla.interface';
import { ConfirmarEliminar } from '../confirmarEliminar/confirmarEliminar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vehiculo-card',
  imports: [MatCardFooter, MatCard, MatCardModule, MatButtonModule],
  templateUrl: './vehiculoCard.html',
  styleUrl: './vehiculoCard.css',
})
export class VehiculoCard {
  vehiculo = input.required<Vehiculo>();

  datosService = inject(ObtenerDatosService)
  dialog = inject(MatDialog)

  editar(v: Vehiculo) {
    this.datosService.vehiculoSeleccionado.set(v);
    this.dialog.open(EditarVehiculo);
  }

  eliminarVehiculo(v: Vehiculo) {

    const dialog = this.dialog.open(ConfirmarEliminar)

    dialog.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        const vehiculos = this.datosService.clienteSeleccionado()[0].vehiculo.filter(i => i != v)
        this.datosService.clienteSeleccionado()[0].vehiculo = vehiculos

        this.datosService.clienteSeleccionado.update(datos => [...datos])
      }
    })



  }

}
