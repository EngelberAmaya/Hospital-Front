import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  
  { path: 'login', component: LoginComponent, data: { titulo:'Login' } },
  { path: 'register', component: RegisterComponent, data: { titulo:'Register' } },
  { path: '',
  	component: PagesComponent,
  	canActivate: [ LoginGuardGuard ],
  	loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});