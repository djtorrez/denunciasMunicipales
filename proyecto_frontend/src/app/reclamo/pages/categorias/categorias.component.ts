import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Categoria } from '../../../interfaces/categorias';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  loading = false;
  categorias!:Categoria[]
  id:string="";
  nombre:string="";
  descripcion:string="";
  formulario:boolean=false;
  esconderAdd:boolean=false;
  constructor(private firebaseService: FirebaseService, private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getCategorias().subscribe((categorias)=>{
        this.categorias = categorias;
      })
  }
  addCategoria(): void{
    this.apiService.addCategoria(this.nombre, this.descripcion);
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
    this.apiService.editarCategorias(this.id,this.nombre,this.descripcion);/*.subscribe((res)=>{
      console.log(res);
    })*/
    
  }
  eliminarCategoria(id:string){
    this.apiService.eliminarCategoria(id);
  }
  
}
