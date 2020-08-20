import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
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
export class HospitalService {

  token: string;
  hospital: Hospital;
  totalHospitales: number = 0;


  constructor(public http: HttpClient, public router: Router,
              public _subirArchivoService: SubirArchivoService,
              public _usuarioService: UsuarioService) { }


  cargarHospitales(desde: number = 0){

  	let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);
              
  }

// para el componente de crear medico
  cargarHospital(){
      let url = URL_SERVICIOS + '/hospital/hosp';
      return this.http.get(url)
                .pipe(
                    map((resp: any) => {
                      this.totalHospitales = resp.total;
                      return resp.hospitales;
                    })
                 )
  }


  obtenerHospital(id: string){

  	let url = URL_SERVICIOS + '/hospital/' + id;
  	return this.http.get(url)
                .pipe(
                  map((resp: any) => {
                    resp.hospital
                  })
                );

  }

  borrarHospital(id: string){
  	let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
            .pipe(
              map( resp => {
                swal('Hospital borrado', 'Eliminado correctamente','success');
                return true;
              })
             )

  	
  }

  crearHospital(nombre: string){

  	let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;

  	return this.http.post(url, { nombre })
  				
  				.pipe(
	                map( (resp: any) => {
	                 	swal('Hospital creado', nombre, 'success');
  						      return resp.hospital;
	                })
	              )
  }


  buscarHospital(termino: string){
  	let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url)
                .pipe(
                  map( (resp: any)  => resp.hospitales) 
                 )
  }

  actualizarHospital(hospital: Hospital){

  	let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital)
                .pipe(
                    map( (resp: any) => {
                      resp.hospital;
                      
                      swal('Hospital actualizado', hospital.nombre, 'success');

                      return true;

                    })
                 )
  }


}
