import { Routes } from '@angular/router';
import { AddRegistro } from './pages/addRegistro/addRegistro';
import { HomePage } from './pages/homePage/homePage';
import { VehiculoPage } from './pages/vehiculo/vehiculo';

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
        path: '**',
        redirectTo: ''
    }
];
