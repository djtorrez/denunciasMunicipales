import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/interfaces/areas';
import { Categoria } from 'src/app/interfaces/categorias';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle-area',
  templateUrl: './detalle-area.component.html',
  styleUrls: ['./detalle-area.component.css']
})
export class DetalleAreaComponent {
  id!:string
  area!:Area
  categorias!:Categoria[]
  categoria!:string
  

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.apiService.getArea(this.id).subscribe((res)=>{
      console.log(res);
      this.area=res
      this.apiService.getCategorias().subscribe((resc)=>{
        this.categorias=resc

        if (this.area.categorias?.length!=0) {
          this.categorias = this.categorias.filter(objeto => ! this.area.categorias!.includes(objeto.nombre!));
        }
      })
    })
  }

  addCategoriaAlArea(){
    this.apiService.addCategoriaAlArea(this.id,this.categoria);
  }
}
