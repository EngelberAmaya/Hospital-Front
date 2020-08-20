import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
//import swal from 'sweetalert';
declare var swal: any;
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _modalUploadService: ModalUploadService,
              public _hospitalService: HospitalService) { }

  ngOnInit(): void {
  	this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( () => {
          this.cargarHospitales();
        })
  }

  cargarHospitales(){

  	this.cargando = true;

  	this._hospitalService.cargarHospitales(this.desde)
  			.subscribe( (resp: any) => {
  				//console.log(resp);
  				this.totalRegistros = resp.total;
  				this.hospitales = resp.hospitales;
  				this.cargando = false;
  			});
  }

  cambiarDesde(valor: number){

  	let desde = this.desde + valor;
  	console.log(desde)

  	if (desde >= this.totalRegistros) {
  		return;
  	}

  	if (desde < 0) {
  		return;
  	}

  	this.desde += valor;
  	this.cargarHospitales();

  }


  buscarHospital(termino: string){

  	if (termino.length <= 0) {
  		this.cargarHospitales();
  		return;
  	}

  	//console.log(termino);
  	this._hospitalService.buscarHospital(termino)
  			.subscribe( (hospitales: Hospital[]) => {
  				//console.log(usuarios);
  				this.hospitales = hospitales;
  				
  			});

  }


  borrarHospital(hospital: Hospital){  	
  	
  	swal({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar a ${ hospital.nombre }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(borrar => {

    	//console.log(borrar);

    	if (borrar) {
    		this._hospitalService.borrarHospital(hospital._id)
    				.subscribe( borrado => {
    					console.log(borrado);
    					this.cargarHospitales();
    					//this._usuarioService.cargarUsuarios(0).subscribe();
  							
    				});
    	}
    });

  }

  modNombreHospital(hospital: Hospital){
  	this._hospitalService.actualizarHospital(hospital)
  			.subscribe();
  }

  crearHospital(){
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      content: 'input',
      icon: 'info',
      inputPlaceholder: 'Nombre del hospital',
      dangerMode: true,
    }).then((valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
            .subscribe( () => this.cargarHospitales());

    })
    
  }

  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales',hospital._id);
  }

}
