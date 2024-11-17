export interface AuthFormI {
  Email: string;
  Password: string;
}

export interface UsuarioI {
  id?:        string;
  nombres:   string;
  apellidos: string;
  email:     string;
  nickname:  string;
}


export interface SignUpFormI {
  nombres:   string;
  apellidos: string;
  email:     string;
  nickname:  string;
  password:  string;
  repeatPassword: string;
  terminosYCondiciones?: boolean
}
