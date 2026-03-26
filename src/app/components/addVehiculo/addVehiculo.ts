import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Vehiculo, DatosTabla } from '../../interfaces/datosTabla.interface';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';

@Component({
  selector: 'app-add-vehiculo',
  imports: [MatDialogContent,
    MatButtonModule,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatDialogClose,
    MatSelectModule,
  ],
  templateUrl: './addVehiculo.html',
  styleUrl: './addVehiculo.css',
})
export class AddVehiculo {

  fb = inject(FormBuilder)
  dialog = inject(MatDialog)
  datosService = inject(ObtenerDatosService)

  cliente = this.datosService.clienteSeleccionado()

  matriculaRgx = '^[0-9]{4}[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]{3}$'

  vehiculoForm: FormGroup = this.fb.group({
    vehiculo: ['', [Validators.required, Validators.pattern(this.matriculaRgx)]],
    dispositivo: ['', Validators.required],
    tarjeta: ['', Validators.required],
    estado: [''],
    tipo: ['', Validators.required],
    ultimaPosicion: [{}]
  })

  mostrarError(nombreInput: string): string | null {

    if (!this.vehiculoForm.controls[nombreInput]) return null

    const error = this.vehiculoForm.controls[nombreInput].errors ?? {}

    for (const key of Object.keys(error)) {
      switch (key) {
        case 'required':
          return 'Campo requerido'
        case 'pattern':
          return `Matrícula no válida`
      }
    }
    return null

  }

  isValidForm(nombreInput: string): boolean | null {
    return (this.vehiculoForm.controls[nombreInput].errors && this.vehiculoForm.controls[nombreInput].touched)
  }

  addVehiculo(cliente: DatosTabla) {
    const newVehiculo = this.vehiculoForm.value;
    const vehiculo: Vehiculo = {
      vehiculo: newVehiculo['vehiculo'],
      dispositivo: newVehiculo['dispositivo'],
      tarjeta: newVehiculo['tarjeta'],
      estado: '',
      tipo: newVehiculo['tipo'],
      ultimaPosicion: {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVVNKcWkl9e6q9st7loHTXZLfoPM-uroYj3w&s',
        alt: 'imagen google maps'
      }
    };

    cliente.vehiculo.push(vehiculo)
  }

}
