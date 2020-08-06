import { Component } from '@angular/core';
import { SettingService } from './services/service.index';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //title = 'Proyecto';
  constructor(public _ajustes: SettingService){

  }
}
