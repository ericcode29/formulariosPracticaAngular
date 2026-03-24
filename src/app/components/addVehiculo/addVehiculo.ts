import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogClose } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Vehiculo, DatosTabla } from '../../interfaces/datosTabla.interface';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';

@Component({
  selector: 'app-add-vehiculo',
  imports: [MatDialogActions,
    MatDialogContent,
    MatButtonModule,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatLabel,
    MatError, MatDialogClose],
  templateUrl: './addVehiculo.html',
  styleUrl: './addVehiculo.css',
})
export class AddVehiculo {

  fb = inject(FormBuilder)
  dialog = inject(MatDialog)
  datosService = inject(ObtenerDatosService)

  cliente = this.datosService.clienteSeleccionado()

  vehiculoForm: FormGroup = this.fb.group({
    vehiculo: ['', [Validators.required]],
    dispositivo: ['', Validators.required],
    tarjeta: ['', Validators.required],
    estado: [''],
    ultimaPosicion: [{}]
  })

  addVehiculo(cliente: DatosTabla) {
    const newVehiculo = this.vehiculoForm.value;
    const vehiculo: Vehiculo = {
      vehiculo: newVehiculo['vehiculo'],
      dispositivo: newVehiculo['dispositivo'],
      tarjeta: newVehiculo['tarjeta'],
      estado: '',
      ultimaPosicion: {}
    };

    cliente.vehiculo.push(vehiculo)
  }

}
