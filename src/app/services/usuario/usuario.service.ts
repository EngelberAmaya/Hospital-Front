import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
//import 'rxjs/add/operator/map';
import { tap, map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';


import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient, public router: Router) { 
    this.cargarStorage();
  }

  estaLogeado(){
    return (this.token.length > 5 ) ? true : false;
  }

  logOut(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    //localStorage.removeItem('id');  
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
    
  }

  cargarStorage(){
    if (localStorage.getItem('token')) { 
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  login(usuario: Usuario, recordar: boolean = false){

    if (recordar) { 
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email' );
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario)
          .pipe(
              map( (resp: any) => {
                localStorage.setItem('id', resp.id );
                localStorage.setItem('token', resp.token );
                localStorage.setItem('usuario', JSON.stringify(resp.usuario));

                return true;

              })
           )

  }

  crearUsuario(usuario: Usuario){

  	let url = URL_SERVICIOS + '/usuario';

  	return this.http.post(url, usuario)
  				
  				.pipe(
	                tap( (resp: any) => {
	                 	swal('Usuario creado', usuario.email, 'success');
  						      return resp.usuario;
	                })
	              )

  }

}
