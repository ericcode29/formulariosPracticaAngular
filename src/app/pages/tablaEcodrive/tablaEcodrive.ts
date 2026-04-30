import { Component, computed, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-tabla-ecodrive',
  imports: [TableModule, MatIcon],
  templateUrl: './tablaEcodrive.html',
  styleUrl: './tablaEcodrive.css',
})
export class TablaEcodrive {

  columnas = signal(['I', 'V', 'D', 'C', 'Cm', 'Cr', 'T', 'Tr', 'Tc', 'Vmx', 'Vm', 'Frena', 'Aceler', 'Giros', 'CO2', 'Pnt.Media', 'Semana anterior'])

  datos = signal([
    {
      v: 'Megane123',
      i: 'directions_car',
      d: '1122 km',
      c: '7 l',
      cm: '6.8 l/100km',
      cr: '1 l',
      t: '02h 30m',
      tr: '02h 20m',
      tc: '02h 30m',
      vmx: '130km/h',
      vm: '40km/h',
      frena: 1,
      aceler: 2,
      giros: 12,
      co2: '20kg',
      pntmed: 10,
      semant: 7
    },
    {
      v: 'Megane123',
      i: 'local_shipping',
      d: '1122 km',
      c: '10 l',
      cm: '1.2 l/100km',
      cr: '1 l',
      t: '02h 30m',
      tr: '02h 20m',
      tc: '02h 30m',
      vmx: '130km/h',
      vm: '40km/h',
      frena: 1,
      aceler: 2,
      giros: 12,
      co2: '20kg',
      pntmed: 10,
      semant: 7
    }
  ])

  consumoTotal = computed(() => {
    let total = 0
    this.datos().forEach(dato => {
      const valor = Number(dato.c.split('l')[0])
      if (!isNaN(valor)) {
        total += valor
      }
    })
    return total
  })
  consumoMedioTotal = computed(() => {
    let total = 0
    this.datos().forEach(dato => {
      const valor = parseFloat(dato.cm.split('l')[0])
      if (!isNaN(valor)) {
        total += valor
      }
    });
    return total / this.datos().length
  })
  toneladasCO2 = computed(() => {
    let total = 0
    this.datos().forEach(dato => {
      const valor = parseFloat(dato.co2.split('kg')[0])
      if (!isNaN(valor)) {
        total += valor;
      }
    })
    return total
  })
  distaciaTotal = computed(() => {
    let total = 0;
    this.datos().forEach(dato => {
      const valor = parseFloat(dato.d.split('km')[0])
      if (!isNaN(valor)) {
        total += valor
      }
    });
    return total
  })
  tiempoRTotal = computed(() => {
    let mt = 0;
    this.datos().forEach(dato => {
      const horas = parseFloat(dato.tr.split('h')[0]) * 60
      const mins = parseFloat(dato.tr.split(' ')[1].split('m')[0])

      if (!isNaN(horas)) {
        mt += horas
        mt += mins
      }
    })
    return {
      horas: Math.floor(mt / 60),
      mins: mt % 60
    }
  })

}
