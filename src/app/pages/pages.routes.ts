import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';


const pagesRoutes: Routes = [
  { path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
    	{ path: 'dashboard', component: DashboardComponent, data: { titulo:'Dashboard' } },
    	{ path: 'progress', component: ProgressComponent, data: { titulo:'ProgressBar' } },
  		{ path: 'grafica1', component: Grafica1Component, data: { titulo:'Gráficas' } },
  		{ path: 'promesas', component: PromesasComponent, data: { titulo:'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo:'Rxjs' } },
       { path: 'perfil', component: ProfileComponent, data: { titulo:'Perfil de usuario' } },
  		{ path: 'account-settings', component: AccoutSettingsComponent, data: { titulo:'Ajustes de Tema' } },
 		{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  }  
  
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);