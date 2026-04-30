import { Routes } from '@angular/router';
import { AddRegistro } from './pages/addRegistro/addRegistro';
import { HomePage } from './pages/homePage/homePage';
import { VehiculoPage } from './pages/vehiculo/vehiculo';
import { TablaEcodrive } from './pages/tablaEcodrive/tablaEcodrive';

export const routes: Routes = [

    {
        path: '',
        component: HomePage
    },
    {
        path: 'registros',
        component: AddRegistro
    },
    {
        path: 'vehiculos',
        component: VehiculoPage
    },
    {
        path: 'ecodrive',
        component: TablaEcodrive
    },
    {
        path: '**',
        redirectTo: ''
    }
];
