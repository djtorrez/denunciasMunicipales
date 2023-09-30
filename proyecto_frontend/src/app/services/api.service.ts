import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatGPTResponse } from '../interfaces/chatgpt';
import { Profile } from '../interfaces/profile';
import { MyReclamo } from '../interfaces/reclamos';
import { Funcionario } from '../interfaces/funcionario';
import { User } from '../interfaces/user';
import { Categoria } from '../interfaces/categorias';
import { Estado } from '../interfaces/estados';
import { Area } from '../interfaces/areas';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseReclamoUrl: string = 'http://localhost:8080/api/reclamos';
  baseCategoriaUrl: string = 'http://localhost:8080/api/categorias';
  baseEstadoUrl: string = 'http://localhost:8080/api/estados';
  baseUserUrl:string = 'http://localhost:8080/api/users';
  baseAreasUrl:string = 'http://localhost:8080/api/areas';
  baseFuncionarioUrl:string = 'http://localhost:8080/api/funcionarios';
  areas!:Area
  constructor(private http: HttpClient, private router: Router) {

  }
  geProfile(): Observable<Profile> {
    return this.http.get<Profile>('http://127.0.0.1:8080/api/chatgpt/get-algo');
  }
  geMsgChatGpt(request: any): Observable<ChatGPTResponse> {
    return this.http.post<ChatGPTResponse>('http://127.0.0.1:8080/api/chatgpt/', request);
  }
  geUser(documentoId:string): Observable<User> {
    return this.http.get<User>(`${this.baseUserUrl}/usuario/${documentoId}`);
  }
  /* getReclamos(): Observable<MyReclamo[]> {
    const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    return this.http.get<MyReclamo[]>(`${this.baseReclamoUrl}/${funcionario.area}`);
  } */
  getReclamos(categorias:string[]): Observable<MyReclamo[]> {
    // const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    return this.http.post<MyReclamo[]>(`${this.baseReclamoUrl}/reclamoArea`,{categorias:categorias});

    
  }
  getCategoriasArea(): Observable<Area> {
     const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
   
   return this.http.post<Area>(`${this.baseAreasUrl}/getcategoriaArea`,{area:funcionario.area})
    
  }
  getReclamoPorEstado(estado:string, categorias:string[]):Observable<MyReclamo[]>{
    const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    const body = {
      area: funcionario.area,
      estado: estado,
      categorias:categorias
    }
    return this.http.post<MyReclamo[]>(`${this.baseReclamoUrl}/reclamos-estado`,body) ;
  }
  getReclamoPorFecha(fechaIni: Date, fechaFin: Date,categorias:string[]):Observable<MyReclamo[]>{
    const funcionario:Funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    const ini = new Date(fechaIni);
    const fin = new Date(fechaFin);
    const body = {
      area: funcionario.area,
      fechaIni: ini,
      fechaFin: fin,
      categorias:categorias
    }
    return this.http.post<MyReclamo[]>(`${this.baseReclamoUrl}/reclamos-fecha`,body) ;
  }

  getReclamo(id:string):Observable<MyReclamo>{
    return this.http.get<MyReclamo>(`${this.baseReclamoUrl}/reclamo-id/${id}`);
  }

  changeEstado(nuevoEstado: string,phoneToken:string,documentId:string){
    const body = {
      nuevoEstado: nuevoEstado,
      documentId: documentId,
      phoneToken: phoneToken
    }
      this.http.post(`${this.baseReclamoUrl}/reclamos-update-estado-id`,body).subscribe((resp)=>{
        this.router.navigate(['/dashboard/allreclamos']);
      });
  }
  changeComentario(comentario: string,phoneToken:string,documentId:string){
    const body = {
      comentario: comentario,
      documentId: documentId,
      phoneToken: phoneToken
    }
      this.http.post(`${this.baseReclamoUrl}/reclamo-change-comentario`,body).subscribe((resp)=>{
        this.router.navigate(['/dashboard/allreclamos']);
      });
  }


  //CATEGORIAS

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseCategoriaUrl}/allcategorias`);
  }

  addCategoria(nombre:string,descripcion:string):void{
    const data={
      nombre:nombre, 
      descripcion: descripcion
    }
    this.http.post<any>(`${this.baseCategoriaUrl}/addcategoria`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allestados'])
     });
  }

  editarCategorias(id:string, nuevoNombre:string, nuevaDescripcion:string): void{
    const data={
      documentId:id,
      nuevoNombre:nuevoNombre, 
      nuevaDescripcion: nuevaDescripcion
    }
    this.http.post<any>(`${this.baseCategoriaUrl}/editar_categoria`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allestados'])
     });
  }

  eliminarCategoria(documentId:string):void{
    const data={
      documentId:documentId
    }
    this.http.post<any>(`${this.baseCategoriaUrl}/eliminar_categoria`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allestados'])
     });
  }

  //ESTADOS

  getEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.baseEstadoUrl}/allestados`);
  }
  editarEstados(documentId:string, nuevoNombre:string, nuevaDescripcion:string): void{
    const data={
      documentId:documentId,
      nuevoNombre:nuevoNombre, 
      nuevaDescripcion: nuevaDescripcion
    }
    this.http.post<any>(`${this.baseEstadoUrl}/editar_estado`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allestados'])
     });
  }

  eliminarEstado(documentId:string):void{
    const data={
      documentId:documentId
    }
    this.http.post<any>(`${this.baseEstadoUrl}/eliminar_estado`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allestados'])
     });
  }

  guardarNuevoEstado(nombre:string,descripcion:string):void{
    const data={
      nombre:nombre, 
      descripcion: descripcion
    }
    this.http.post<any>(`${this.baseEstadoUrl}/addestado`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allestados'])
     });
  }

  //AREAS

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(`${this.baseAreasUrl}/allareas`);
  }

  getArea(id:string):Observable<Area>{
    return this.http.get<Area>(`${this.baseAreasUrl}/area-id/${id}`);
  }
  addArea(nombre:string,descripcion:string):void{
    const data={
      nombre:nombre, 
      descripcion: descripcion
    }
    this.http.post<any>(`${this.baseAreasUrl}/addarea`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allareas'])
     });
  }

  editarAreas(id:string, nuevoNombre:string, nuevaDescripcion:string): void{
    const data={
      documentId:id,
      nuevoNombre:nuevoNombre, 
      nuevaDescripcion: nuevaDescripcion
    }
    this.http.post<any>(`${this.baseAreasUrl}/editar_area`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allareas'])
     });
  }

  eliminarArea(documentId:string):void{
    const data={
      documentId:documentId
    }
    this.http.post<any>(`${this.baseAreasUrl}/eliminar_area`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/allareas'])
     });
  }

  addCategoriaAlArea(documentId:string,categoria:string){
    const data = {
      documentId: documentId,
      categoria: categoria
    };
  
    this.http.post<any>(`${this.baseAreasUrl}/addcategoria`, data).subscribe((res) => {
      console.log(res);
  
      this.router.navigate(['/dashboard/allareas']);
    });
  }

  //FUNCIONARIOS

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseFuncionarioUrl}/getallfuncionario`);
  }

  addFuncionario(area:string,nombre:string,telefono:string,username:string,email:string,password:string):void{
    const data={
      area:area,
      nombre:nombre, 
      telefono: telefono,
      username:username,
      email:email,
      password:password,
    }
    this.http.post<any>(`${this.baseFuncionarioUrl}/addFuncionario`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/getallfuncionario'])
     });
  }
  editarFuncionarios(documentId:string,area:string,nombre:string,telefono:string,username:string,email:string,password:string): void{
    const data={
      documentId:documentId,
      area:area, 
      nombre: nombre,
      telefono:telefono,
      username:username,
      email:email,
      password:password
    }
    this.http.post<any>(`${this.baseFuncionarioUrl}/editarFuncionario`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/getallfuncionario'])
     });
  }
  eliminarFuncionario(documentId:string):void{
    const data={
      documentId:documentId
    }
    this.http.post<any>(`${this.baseFuncionarioUrl}/eliminarFuncionario`,data).subscribe((res)=>{
      console.log(res);
      
      this.router.navigate(['/dashboard/getallfuncionario'])
     });
  }

}
