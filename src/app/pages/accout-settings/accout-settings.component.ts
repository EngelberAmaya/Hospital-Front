import { Component, OnInit } from '@angular/core';
//import { Document } from '@angular/platform-browser';
//import { Document } from '@angular/common';
import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: [
  ]
})
export class AccoutSettingsComponent implements OnInit {

  constructor( private settingsService: SettingService  ) {}

    ngOnInit(): void {
      this.settingsService.checkCurrentTheme();
    }

    changeTheme( theme: string ) {
          
      this.settingsService.changeTheme( theme );
      
    }


}
