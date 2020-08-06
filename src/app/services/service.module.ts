import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService , SharedService, SidebarService } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
  	SettingService,
  	SharedService,
  	SidebarService
  ]
})
export class ServiceModule { }
