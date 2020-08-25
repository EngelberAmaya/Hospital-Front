import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(public _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  	this.usuario = this._usuarioService.usuario;
  }

  buscar(termino: string){
  	this.router.navigate(['/busqueda', termino]);
  }

}
