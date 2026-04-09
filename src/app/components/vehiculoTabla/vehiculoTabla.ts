import { Component, inject, input, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { Vehiculo } from '../../interfaces/datosTabla.interface';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { EditarVehiculo } from '../editarVehiculo/editarVehiculo';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';
import { ConfirmarEliminar } from '../confirmarEliminar/confirmarEliminar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'vehiculo-tabla',
  imports: [TableModule, MatRadioModule, MatCheckboxModule, MatButtonModule, MatFormField, MatLabel, MatInput],
  templateUrl: './vehiculoTabla.html',
  styleUrl: './vehiculoTabla.css',
})
export class VehiculoTabla {

  dialog = inject(MatDialog)
  datosService = inject(ObtenerDatosService)

  columnas = signal<string[]>([])
  campos = ['dispositivo', 'tarjeta', 'estado', 'direccion', 'gps', 'gsm', 'img', 'matricula']
  vehiculos = input.required<Vehiculo[]>()

  check(value: string) {
    this.columnas.update(col =>
      col.includes(value) ? col.filter(c => c !== value) : [...col, value]
    )
  }

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
