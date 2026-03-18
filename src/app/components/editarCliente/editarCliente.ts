import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from "@angular/material/form-field";
import { HomePage } from '../../pages/homePage/homePage';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';
import { MatInput, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-editar-cliente',
  imports: [MatDialogActions, 
    MatDialogContent,
     MatButtonModule, 
     MatFormField,
     MatInputModule, 
     ReactiveFormsModule, 
     MatLabel, 
     MatError],
  templateUrl: './editarCliente.html',
  styleUrl: './editarCliente.css',
})
export class EditarCliente {
  
  fb = inject(FormBuilder)
  dialog = inject(MatDialog)
  cliente = inject(ObtenerDatosService).clienteSeleccionado()[0]
  emailregx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  editForm: FormGroup= this.fb.group({
    usuario: [this.cliente?.usuario, [ Validators.minLength(3)]],
    empresa: [this.cliente?.empresa],
    cif: [this.cliente?.cif,[ Validators.minLength(9), Validators.maxLength(9)]],
    email: [this.cliente?.email,[ Validators.pattern(this.emailregx)]],
    telefono: [this.cliente?.telefono, [Validators.max(999999999), Validators.min(99999999)]],
    direccion: [this.cliente?.direccion],
    comercial: [this.cliente?.comercial, [ Validators.minLength(3)]],
    tipo: [this.cliente?.tipo],
  })

  mostrarError(nombreInput:string): string | null{

    if(!this.editForm.controls[nombreInput]) return null

    const error = this.editForm.controls[nombreInput].errors ?? {}

    for(const key of Object.keys(error)){
      switch(key){
        case 'required':
          return 'Campo requerido'
        case 'minlength':
          return `Se necesitan al menos ${error['minlength'].requiredLength} de caracteres`
        case 'maxlength':
          return `No puede exceder más de ${error['maxlength'].requiredLength} de caracteres`
        case 'pattern':
          return 'Email inválido'
        case 'min':
          return 'El numero debe contener al menos 9 caracteres'
        case 'max':
          return 'El numero debe contener 9 caracteres'
      }
    }
    return null

  }

  isValidForm(nombreInput:string):boolean|null{
    return (this.editForm.controls[nombreInput].errors && this.editForm.controls[nombreInput].touched)
  }

  cerrar(){
    this.dialog.closeAll()
  }

  //hacer funcion para guardar los cambios del cliente

}
