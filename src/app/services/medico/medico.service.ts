import { Injectable } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Router } from '@angular/router';
import { tap, map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {


  medico: Medico;
  totalMedicos: number = 0;

  constructor(public http: HttpClient, public router: Router,
              public _subirArchivoService: SubirArchivoService,
              public _usuarioService: UsuarioService) { }


  cargarMedicos(desde: number = 0){

  	let url = URL_SERVICIOS + '/medico?desde=' + desde;

    return this.http.get(url);
              
  }


  obtenerHMedicos(id: string){

  	let url = URL_SERVICIOS + '/medico/' + id;
  	return this.http.get(url)
                .pipe(
                  map((resp: any) => {
                    resp.medicos
                  })
                )

  }

  borrarMedico(id: string){
  	let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
            .pipe(
              map( resp => {
                swal('Médico borrado', 'Eliminado correctamente','success');
                return true;
              })
             )
  }

  guardarMedico(medico: Medico){

    let url = URL_SERVICIOS + '/medico';

    if (medico._id) { 
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, medico)
              
              .pipe(
                      map( (resp: any) => {
                         swal('Médico actualizado', medico.nombre, 'success');
                        return resp.medico;
                        
                      })
                    )      

    } else {
      //creando
       url += '?token=' + this._usuarioService.token;

        return this.http.post(url, medico)
              
              .pipe(
                      map( (resp: any) => {
                         swal('Médico creado', medico.nombre, 'success');
                        return resp.medico;
                      })
                    )
    }

  	
   
  }

  /*
  crearMedico( medico: { nombre: string, hospital: string } ) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico, this.headers );
  }

  */


  buscarMedico(termino: string){
  	let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url)
                .pipe(
                  map( (resp: any)  => resp.medicos) 
                 )
  }


  actualizarMedicos(medico: Medico){

  	let url = URL_SERVICIOS + '/medico/' + medico._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, medico)
                .pipe(
                    map( (resp: any) => {
                      resp.medico;
                      
                      swal('Médico actualizado', medico.nombre, 'success');

                      return true;

                    })
                 )
  }

  cargarMedicoPorId( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get( url )
              .pipe(
                map( (resp: any) => resp.medico )
              );
  }


}
