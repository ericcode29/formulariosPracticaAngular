import { Routes } from '@angular/router';
import { AddRegistro } from './pages/addRegistro/addRegistro';
import { HomePage } from './pages/homePage/homePage';
import { Vehiculo } from './pages/vehiculo/vehiculo';

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
        component: Vehiculo
    },
    {
        path: '**',
        redirectTo: ''
    }
];
