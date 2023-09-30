import { Component } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/funcionario';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ApiService } from 'src/app/services/api.service';
import { Area } from 'src/app/interfaces/areas';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {
  loading = false;
  funcionarios!:Funcionario[]
  documentId:string="";
  formulario:boolean=false;
  esconderAdd:boolean=false;
  area:string="";
  nombre:string="";
  telefono:string="";
  username:string="";
  email:string="";
  password:string="";
  areas!:Area[]
  constructor( private apiService: ApiService,private firebaseService: FirebaseService) {

  }
  ngOnInit(): void {
    this.apiService.getFuncionarios().subscribe((funcionarios)=>{
        this.funcionarios = funcionarios;
    
    })
    this.apiService.getAreas().subscribe((resc)=>{
      this.areas=resc
    })
}
  botonAddc(){
    this.esconderAdd=true;

  }
  addFuncionario(): void{
    this.apiService.addFuncionario(this.area, this.nombre,this.telefono,this.username,this.email,this.password);
  }
  abrirFormularioParaEditar(documentId:string,area:string,nombre:string,telefono:string,username:string,email:string,password:string){
    this.documentId=documentId;
    this.area=area;
    this.nombre=nombre;
    this.telefono= telefono;
    this.username=username;
    this.email=email;
    this.password=password;
    this.formulario=true;
  }
  guardarCambios(){
    this.apiService.editarFuncionarios(this.documentId,this.area,this.nombre, this.telefono, this.username,this.email,this.password);/*.subscribe((res)=>{
      console.log(res);
    })*/
    
  }
  eliminarFuncionario(id:string){
    this.apiService.eliminarFuncionario(id);
  }
}
