export interface User {
  email?:      string;
  password?:   string;
  avatar?:     string;
  telefono?:   string;
  pin?:        string;
  timer?:      Timer;
  bloqueado?:  boolean;
  intentos?:   number;
  name?:       string;
  uuid?:       string;
  ci?:         string;
  phoneToken?: string;
}

export interface Timer {
  _seconds?:     number;
  _nanoseconds?: number;
}
