import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatosTabla } from '../../interfaces/datosTabla.interface';
import { ObtenerDatosService } from '../../services/obtenerDatos.service';


@Component({
  selector: 'app-home-page',
  imports: [TableModule],
  templateUrl: './homePage.html',
  styleUrl: './homePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {

  datosService = inject(ObtenerDatosService)
  datos = computed(() => {
    const filtro = this.datosService.filtro().toLocaleLowerCase()
    const dt = this.datosService.obtenerDatos()

    if (filtro === '') return dt

    return dt.filter(dato => {
      return dato.usuario.toLocaleLowerCase().includes(filtro) || dato.email.toLocaleLowerCase().includes(filtro) || dato.comercial.toLocaleLowerCase().includes(filtro) || dato.empresa.toLocaleLowerCase().includes(filtro)
    })
  })
  }


