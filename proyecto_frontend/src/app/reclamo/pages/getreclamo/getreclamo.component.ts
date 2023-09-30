import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pos } from 'src/app/interfaces/center';
import { MyReclamo } from 'src/app/interfaces/reclamos';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-getreclamo',
  templateUrl: './getreclamo.component.html',
  styleUrls: ['./getreclamo.component.css']
})
export class GetreclamoComponent {
  comentario:string = ''
  loading = true;
  id!: string
  reclamo!: MyReclamo
  user!: User
  fotos!: String[]
  center: Pos = {
    position: {
      lat: -17.78469568080407,
      lng: -63.180979016391184
    }
  }
  title = 'gmaps';
  zoom: number = 13;
  options = {
    draggable: false,
    icon: `/assets/markers/location.png`
  }
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, private apiService: ApiService) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.apiService.getReclamo(this.id).subscribe(reclamo => {
      this.reclamo = reclamo;
      this.fotos = this.reclamo.fotos!
      this.center.position = {
        lat: Number(this.reclamo!.posicion![0]),
        lng: Number(this.reclamo!.posicion![1])
      }
      this.apiService.geUser(this.reclamo.uuid!).subscribe((user) => {
        this.user = user;
        console.log(this.user);
      })
      this.loading = false;
    })
    /*   this.firebaseService.getReclamo(this.id).then(reclamo => {
       this.reclamo = reclamo;
       this.fotos = this.reclamo.fotos!
       this.center.position = {
         lat: Number(this.reclamo!.posicion![0]),
         lng: Number(this.reclamo!.posicion![1])
       }
       this.loading = false;
     }) */


  }

  changeEstado(nuevoEstado: string,phoneToken:string) {
    this.loading = true;
    this.apiService.changeEstado(nuevoEstado,phoneToken,this.id);
  }
  dejarComentario(phoneToken:string) {
    if (this.comentario != '') {
      this.loading = true;
      this.apiService.changeComentario(this.comentario,phoneToken,this.id);
    }else{
      console.log('comentario no puede estar vacio');
    }
  }
  changeArea(area: string) {
    this.loading = true;
    this.firebaseService.chageArea(area, this.id);
  }
}
