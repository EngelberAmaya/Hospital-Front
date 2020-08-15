import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
//import 'rxjs/add/operator/map';
import { tap, map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service'

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient, public router: Router,
              public _subirArchivoService: SubirArchivoService) { 
    this.cargarStorage();
  }

  estaLogeado(){
    return (this.token ) ? true : false;
  }

  logOut(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('id');  
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


  guardarStorage(id: string, token: string, usuario: Usuario){
     localStorage.setItem('id', id );
     localStorage.setItem('token', token );
     localStorage.setItem('usuario', JSON.stringify(usuario));
     this.usuario = usuario;
     this.token = token;
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

  actualizarUsuario(usuario: Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    

    return this.http.put(url, usuario)
                .pipe(
                    map( (resp: any) => {

                      let usuarioDB: Usuario = resp.usuario;
                      this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
                      swal('Usuario actualizado', usuario.nombre, 'success');

                      return true;

                    })
                 )
  }


  cambiarImagen(archivo: File, id: string){
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
          .then( (resp: any) => {
            //console.log(resp);

             this.usuario.img = resp.usuario.img;
             swal('Imagen Actualizada', this.usuario.nombre, 'success');

             this.guardarStorage(id, this.token, this.usuario);

          })
          .catch( err => {
            console.log(err);
          });
  }

}
