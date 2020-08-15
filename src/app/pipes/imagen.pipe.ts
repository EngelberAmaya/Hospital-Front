import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
  	/*
  	let url = URL_SERVICIOS;

  	  if ( !img ) {
	      return `${ url }/upload/usuarios/no-image`;
	  } else if ( img.includes('https') ) {
	      return img;
	  } else if ( img ) {
	      return `${ url }/upload/${ tipo }/${ img }`;
	  } else {
	      return `${ url }/upload/usuarios/no-image`;
	  }*/


  	
  	let url = URL_SERVICIOS + '/img';

    if (!img) {
    	return url + '/usuarios/xxx';
    }
    //validacion si vendria una imagen del correo gmail
    if (img.indexOf('https') >= 0) {
    	return img;
    }

    switch (tipo) {
    	case 'usuario':
    		url += '/usuarios/' + img;
    		break;

    	case 'medico':
    		url += '/medicos/' + img;
    		break;

    	case 'hospital':
    		url += '/hospitales/' + img;
    		break;
    	
    	default:
    		console.log('tipo de imagen no existe,debe ser medico, usuario , hospital');
    		url += 'usuarios/xxx';
    		break;
    }

    return url;

  }

}
