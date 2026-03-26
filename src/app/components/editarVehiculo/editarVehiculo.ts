import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';

@Component({
  selector: 'app-editar-vehiculo',
  imports: [
    MatDialogContent,
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
  templateUrl: './editarVehiculo.html',
  styleUrl: './editarVehiculo.css'
})
export class EditarVehiculo {

  fb = inject(FormBuilder)
  datosService = inject(ObtenerDatosService)
  vehiculoSelect = this.datosService.vehiculoSeleccionado()

  matriculaRgx = '^[0-9]{4}[ABCDFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]{3}$'

  vehiculoForm: FormGroup = this.fb.group({
    vehiculo: [this.vehiculoSelect?.vehiculo, [Validators.required, Validators.pattern(this.matriculaRgx)]],
    dispositivo: [this.vehiculoSelect?.dispositivo, Validators.required],
    tarjeta: [this.vehiculoSelect?.tarjeta, Validators.required],
    estado: [this.vehiculoSelect?.estado],
    tipo: [this.vehiculoSelect?.tipo, Validators.required],
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

  guardarCambios() {
    const vehiculoEditado = this.vehiculoForm.value;
    const original = this.datosService.vehiculoSeleccionado();

    if (original) {
      // Actualizamos los valores del objeto original directamente (referencia)
      original.vehiculo = vehiculoEditado.vehiculo;
      original.dispositivo = vehiculoEditado.dispositivo;
      original.tarjeta = vehiculoEditado.tarjeta;
      original.tipo = vehiculoEditado.tipo;
      original.estado = vehiculoEditado.estado;
    }

    // Limpiamos la selección
    this.datosService.vehiculoSeleccionado.set(null);
  }

  cerrar() {
    this.datosService.vehiculoSeleccionado.set(null);
  }

}
