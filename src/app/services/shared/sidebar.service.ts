import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

/*
  menu: any[] = [
     {
       titulo: 'Principal',
       icono: 'mdi mdi-gauge',
       submenu: [
         //{ titulo: 'Main', url: '/' },
         { titulo: 'Dashboard', url: '/dashboard' },
         { titulo: 'Gráficas', url: '/grafica1' },
         { titulo: 'RxJs', url: '/rxjs' },
         { titulo: 'Promesas', url: 'promesas' },
         { titulo: 'ProgressBar', url: '/progress' },
       ]
     },

     {
       titulo: 'Mantenimientos',
       icono: 'mdi mdi-folder-lock-open',
       submenu: [
         { titulo: 'Usuarios', url: '/usuarios' },
         { titulo: 'Hospitales', url: '/hospitales' },
         { titulo: 'Médicos', url: '/medicos' },
       ]
     },
   ];*/

  constructor(public _usuarioService: UsuarioService) { 

    

  }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }


}
