import { Component } from '@angular/core';
import { Estado } from 'src/app/interfaces/estados';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent {
  loading = false;
  estados!:Estado[]
  id:string="";
  nombre:string="";
  descripcion:string="";
  formulario:boolean=false;
  esconderAdd:boolean=false;
  constructor( private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getEstados().subscribe((estados)=>{
        this.estados = estados;
    })
  }
  abrirFormularioParaEditar(documentId:string,nombre:string,descripciom:string){
    this.id=documentId;
    this.nombre=nombre;
    this.descripcion= descripciom;
    this.formulario=true;
  }
  guardarCambios(){
    console.log(this.id,this.nombre,this.descripcion);
    this.apiService.editarEstados(this.id,this.nombre,this.descripcion);/*.subscribe((res)=>{
      console.log(res);
    })*/
    
  }

  eliminarEstado(id:string){
    this.apiService.eliminarEstado(id);
  }

  guardarNuevoEstado(){
    this.apiService.guardarNuevoEstado(this.nombre,this.descripcion);
  }

  botonAdd(){
    this.esconderAdd=true;

  }



}
