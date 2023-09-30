export interface MyReclamo {
  descripcion?: string;
  fecha?:       Fecha;
  estado?:      string;
  categoria?:   string;
  titulo?:      string;
  fotos?:       string[];
  posicion?:    string[];
  uuid?:        string;
  area?:        string;
  id?:          string;
  comentario?:          string;
}

export interface Fecha {
  seconds?:     number;
  nanoseconds?: number;
  _seconds?:     number;
  _nanoseconds?: number;
}
