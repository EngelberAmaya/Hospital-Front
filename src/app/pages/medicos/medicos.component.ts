import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
//import swal from 'sweetalert';
declare var swal: any;
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _modalUploadService: ModalUploadService,
              public _medicoService: MedicoService) { }

  ngOnInit(): void {
  	this.cargarMedicos();
  }


  cargarMedicos(){

  	this.cargando = true;

  	this._medicoService.cargarMedicos(this.desde)
  			.subscribe( (resp: any) => {
  				//console.log(resp);
  				this.totalRegistros = resp.total;
  				this.medicos = resp.medicos;
  				this.cargando = false;
  			});
  }

  cambiarDesde(valor: number){

  	let desde = this.desde + valor;
  	//console.log(desde)

  	if (desde >= this.totalRegistros) {
  		return;
  	}

  	if (desde < 0) {
  		return;
  	}

  	this.desde += valor;
  	this.cargarMedicos();

  }


  buscarMedico(termino: string){

  	if (termino.length <= 0) {
      
  		this.cargarMedicos();
  		return;
  	}

  	
  	//console.log(termino);
  	this._medicoService.buscarMedico(termino)
  			.subscribe( (medicos: Medico[]) => {
  				//console.log(usuarios);
  				this.medicos = medicos;
  				
  			});

  }


  borrarMedico(medico: Medico){  	
  	
  	swal({
      title: '¿Esta seguro?',
      text: `Esta a punto de borrar a ${ medico.nombre }`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(borrar => {

    	//console.log(borrar);

    	if (borrar) {
    		this._medicoService.borrarMedico(medico._id)
    				.subscribe( borrado => {
    					console.log(borrado);
    					this.cargarMedicos();
    					//this._usuarioService.cargarUsuarios(0).subscribe();
  							
    				});
    	}
    });

  }

/*
  modNombreHospital(hospital: Hospital){
  	this._hospitalService.actualizarHospital(hospital)
  			.subscribe();
  }*/

/*
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
    
  }*/

/*
  actualizarImagen(hospital: Hospital){
    this._modalUploadService.mostrarModal('hospitales',hospital._id);
  }*/

  editarMedico(medico: Medico){
    console.log(medico);
  }


}
