export class Utils{
  options = [{ id: "1", valor: "Fecha" },
  { id: "2", valor: "Estado" }]

  estados = [{ id: "1", name: "pendiente" },
  { id: "2", name: "aceptado" },
  { id: "3", name: "rechazado" },
  { id: "4", name: "en proceso" },
  { id: "3", name: "finalizado" }]

  Utils(){

  }
  getOptions(){
    return this.options;
  }

  getEstados(){
    return this.estados
  }

}
