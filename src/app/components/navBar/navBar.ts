import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { ObtenerDatosService } from '../../services/obtenerDatos.service';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive, MatFormField, MatLabel, MatInput, MatIconModule, MatSuffix],
  templateUrl: './navBar.html',
  styleUrl: './navBar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {

  datosService = inject(ObtenerDatosService)

  filtro(value: string){
    this.datosService.filtro.set(value)
  }
  

 }
