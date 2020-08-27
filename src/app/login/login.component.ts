import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl, NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  recuerdame:boolean = false;
  email: string;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit(): void {
  	init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) { 
      this.recuerdame = true;
    }
  }

  ingresar(forma: NgForm){

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(
       null,
       forma.value.email,
       forma.value.password
    );

  	this._usuarioService.login(usuario, forma.value.recuerdame)
                .subscribe( resp => {
                    //console.log(resp);
                    this.router.navigate(['/dashboard']);
                   
                    swal('Bienvenido al sistema', usuario.email, 'success');   
                },
                (err) => {
                  // Si sucede un error
                 swal('Error', 'Credenciales incorrectas', 'error');
                });

  }

}
