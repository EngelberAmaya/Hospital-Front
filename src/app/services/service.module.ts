import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
	SettingService,
	SharedService,
	SidebarService,
	UsuarioService,
  LoginGuardGuard
   } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
  	SettingService,
  	SharedService,
  	SidebarService,
  	UsuarioService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
