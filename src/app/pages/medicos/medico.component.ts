import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

 hospitales: Hospital[] = [];
 medico: Medico = new Medico('');
 
 //public forma: FormGroup;
 hospital: Hospital = new Hospital('');
 //public hospitalSeleccionado: Hospital;

  constructor(public _medicoService: MedicoService,
  			      public _hospitalService: HospitalService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              public _modalUploadService: ModalUploadService) { 

      activatedRoute.params.subscribe( params => {
          let id = params['id'];
          if (id !== 'nuevo') {
            this.cargarMedico(id);
          }
          this.hospital.img = params.img;
      });
  }

  ngOnInit(): void {
  	this._hospitalService.cargarHospital()
  			.subscribe(hospitales => this.hospitales = hospitales);

    this._modalUploadService.notificacion
          .subscribe( resp => {
            this.medico.img = resp.medico.img;
          })


        /*
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),      
      hospital: new FormControl(null, Validators.required)    
    });*/


  }

  guardarMedico(f:NgForm){
    /*if (this.forma.invalid) {
      return;
    }*/


    /*this._medicoService.guardarMedico(this.forma.value)
            .subscribe( medico => {
              this.medico._id = medico._id;
              //console.log(medico);
              return this.router.navigate(['/medico', medico._id]);
            })*/

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
            .subscribe( medico => {
              this.medico._id = medico._id;
              console.log(medico);
              return this.router.navigate(['/medicos']);
            })

  }

  /*
  cambioHospital(id:string){
    this._hospitalService.obtenerHospital(id)
          .subscribe((hospital: any) => {
            this.hospital = hospital;
            //this.medico.hospital.img = hospital.img;
            console.log(hospital);
          });
          //console.log(event);
          
  }*/

  cargarMedico(id:string){
    this._medicoService.cargarMedicoPorId(id)
          .subscribe( medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            //this.cambioHospital(this.medico.hospital);
          });
  }

  cambiarFoto(){
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
