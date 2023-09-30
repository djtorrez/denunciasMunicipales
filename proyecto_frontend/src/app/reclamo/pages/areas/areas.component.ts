import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Area } from '../../../interfaces/areas';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent {
  loading = false;
  areas!:Area[]
  id:string="";
  nombre:string="";
  descripcion:string="";
  formulario:boolean=false;
  esconderAdd:boolean=false;
  constructor(private firebaseService: FirebaseService, private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getAreas().subscribe((areas)=>{
        this.areas = areas;
      })
  }
  addArea(): void{
    this.apiService.addArea(this.nombre, this.descripcion);
  }

  botonAddc(){
    this.esconderAdd=true;

  }
  abrirFormularioParaEditar(documentId:string,nombre:string,descripciom:string){
    this.id=documentId;
    this.nombre=nombre;
    this.descripcion= descripciom;
    this.formulario=true;
  }
  guardarCambios(){
    console.log(this.id,this.nombre,this.descripcion);
    this.apiService.editarAreas(this.id,this.nombre,this.descripcion);/*.subscribe((res)=>{
      console.log(res);
    })*/
    
  }
  eliminarArea(id:string){
    this.apiService.eliminarArea(id);
  }
  
}
