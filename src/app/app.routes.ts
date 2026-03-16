import { Routes } from '@angular/router';
import { AddRegistro } from './pages/addRegistro/addRegistro';
import { HomePage } from './pages/homePage/homePage';

export const routes: Routes = [

    {
        path: '',
        component: HomePage
    },
    {
        path: 'registros',
        component: AddRegistro
    }
];
