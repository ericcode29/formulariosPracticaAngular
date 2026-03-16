import { Component, inject, signal } from '@angular/core';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DatosTabla } from '../../interfaces/datosTabla.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-registro',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatError, ReactiveFormsModule, JsonPipe],
  templateUrl: './addRegistro.html',
  styleUrl: './addRegistro.css',
})
export class AddRegistro { 

  fb = inject(FormBuilder)
  datosService = inject(ObtenerDatosService)
  router = inject(Router)
  emailregx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'

  addForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required, Validators.minLength(3)]],
    empresa: ['', [Validators.required]],
    cif: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    email: ['',[Validators.required, Validators.pattern(this.emailregx)]],
    telefono: [0, [Validators.max(999999999), Validators.min(99999999)]],
    direccion: [''],
    comercial: ['', [Validators.required, Validators.minLength(3)]],
    tipo: [''],

  })

  mostrarError(nombreInput:string): string | null{

    if(!this.addForm.controls[nombreInput]) return null

    const error = this.addForm.controls[nombreInput].errors ?? {}

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
    return (this.addForm.controls[nombreInput].errors && this.addForm.controls[nombreInput].touched)
  }

  crearUsuario(){

    if(this.addForm.invalid){
      window.alert('Por favor corrija los campos')
      return
    }
  
    const newcliente = this.addForm.value
    const cliente:DatosTabla={
      usuario: newcliente['usuario'],
      empresa: newcliente['empresa'],
      cif: newcliente['cif'],
      telefono:newcliente['telefono'],
      direccion:newcliente['direccion'],
      email: newcliente['email'],
      comercial:newcliente['comercial'],
      tipo:newcliente['tipo']
    }

    this.datosService.addCliente(cliente)
    
    this.addForm.reset({
      usuario: '',
      empresa: '',
      cif: '',
      telefono:0,
      direccion:'',
      email:'',
      comercial: '',
      tipo:''
    })

    window.alert('Usuario añadido')
    this.router.navigate([''])
    
    
  }

}
