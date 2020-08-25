import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Usuario } from '../../models/usuario.model';
import { BusquedaService } from '../../services/busqueda/busqueda.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

	hospitales: Hospital[] = [];
	medicos: Medico[] = [];
	usuarios: Usuario[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient,
  			  public busquedaService: BusquedaService) { 
  	activatedRoute.params
  		.subscribe( params => {
  			let termino = params['termino'];
  			//console.log(termino);
  			this.buscar(termino);
  		})
  }

  ngOnInit(): void {
  }

  buscar(termino: string){

  	this.busquedaService.busquedaGlobal( termino )
        .subscribe( (resp: any) => {
          console.log(resp)
          this.usuarios   = resp.usuarios;
          this.medicos    = resp.medicos;
          this.hospitales = resp.hospitales;
        });

  }

}
