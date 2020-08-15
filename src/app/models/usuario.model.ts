import { URL_SERVICIOS } from '../config/config';

let url = URL_SERVICIOS;

export class Usuario {

	 constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        //public google?: boolean,
        //public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public role?: string,
        public _id?: string
    ) {}

     /*
    get imagenUrl() {

        if ( !this.img ) {
            return `${ url }/upload/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ url }/upload/usuarios/no-image`;
        }
    }*/
}