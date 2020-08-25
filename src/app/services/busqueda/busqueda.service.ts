import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  constructor(private http: HttpClient) { }

  busquedaGlobal( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    return this.http.get( url );

  }
}
