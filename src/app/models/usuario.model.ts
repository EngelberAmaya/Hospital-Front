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
}