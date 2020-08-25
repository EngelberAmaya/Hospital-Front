import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService){

  }

  canActivate(){
  	if (this._usuarioService.usuario.role === 'ADMIN_ROLE') { 
  		return true;
  	} else {
  		this._usuarioService.logOut();
  		console.log('bloqueado por el ADMIN GUARD');
  		return false;  		
  	}
  	
  }
     
}
