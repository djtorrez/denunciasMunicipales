import { Component, OnInit,ViewChild  } from '@angular/core';
import { MarkerProperties } from 'src/app/interfaces/markerproperties';
import { MyReclamo } from 'src/app/interfaces/reclamos';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Utils } from 'src/app/utils/util';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ApiService } from '../../../services/api.service';
import { Area } from 'src/app/interfaces/areas';
@Component({
  selector: 'app-reclamosmap',
  templateUrl: './reclamosmap.component.html',
  styleUrls: ['./reclamosmap.component.css']
})
export class ReclamosmapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  showEstados: boolean = false;
  categoriaSelected: string = "Basura";
  estadSelected: string = "pendiente";
  estadoSelected: string = "";
  reclamos: MyReclamo[] | undefined;
  fechaIni: Date = new Date();
  fechaFin: Date = new Date();
  selected: string = "1";
  options:any
  categorias:any;
  estados:any;
  loading = false;
  area!:Area;
  //MAP
  center = {
    lat: -17.78469568080407,
    lng: -63.180979016391184
  }
  title = 'gmaps';
  zoom: number = 13;
  // label = { color: 'red', text: 'marcador' }
  // icon = '/assets/markers/trash.png'
  listaMarcadores: MarkerProperties[] = [];
  // markerPositions: google.maps.LatLngLiteral[] = [];
  constructor(private firebaseService: FirebaseService,private apiService: ApiService) {

  }
  ngOnInit(): void {

    const util = new Utils();
    this.options = util.getOptions();
    this.estados = util.getEstados();

    /* this.firebaseService.getAllReclamos().subscribe((reclamos) => {
      this.reclamos = reclamos
    }) */
  }
  filtrar() {
    this.loading = true;
    switch (this.selected) {
      case "1":
        console.log("filtrar por fecha!!!!");
      /*   this.firebaseService.getReclamoByFecha(this.fechaIni, this.fechaFin).subscribe((data) => {
          this.reclamos = data;
          this.cargarMarkers();
        }); */
        this.apiService.getCategoriasArea().subscribe((area)=>{
          this.area=area;
          this.apiService.getReclamoPorFecha(this.fechaIni, this.fechaFin,this.area.categorias!).subscribe((data) => {
            this.reclamos = data;
            this.loading = false;
          this.cargarMarkers();
        });
      })
        break;
      case "2":
        console.log("filtrar por estado!!!!");
        /* this.firebaseService.getReclamoByEstado(this.estadSelected).subscribe((data) => {
          this.reclamos = data;
          const util = new Utils();
          this.options = util.getOptions();
          this.cargarMarkers();
          this.showEstados = false;
        }); */
        console.log("filtrar por estado!!!!");
        this.apiService.getCategoriasArea().subscribe((area)=>{
          this.area=area;
        this.apiService.getReclamoPorEstado(this.estadSelected,this.area.categorias!).subscribe((data) => {
          this.reclamos = data;
          console.log(this.reclamos);
          this.loading = false;
          const util = new Utils();
          this.options = util.getOptions();
          this.cargarMarkers();
          this.showEstados = false;
        });
      })
        break;
      default:
        break;
    }
  }
  changeOption(e: any) {
    this.selected = e.target.value;
    switch (this.selected) {
      case "1":
        this.showEstados = false;
        break;
      case "2":
        this.showEstados = true;
        break;
      default:
        break;
    }
  }

  private cargarMarkers(){
    this.listaMarcadores = [];
    for (let index = 0; index < this.reclamos!.length; index++) {
      let latlng = {
        position: {
          lat: Number(this.reclamos![index].posicion![0]),
          lng: Number(this.reclamos![index].posicion![1])
        },
         options:{
          draggable: false,
          icon: `/assets/markers/${this.reclamos![index].categoria}.png`
         },
         reclamo: this.reclamos![index]
      }
      this.listaMarcadores?.push(latlng)
    }
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow){
    if (this.infoWindow && this.infoWindow !== infoWindow) {
      this.infoWindow.close();
    }
    this.infoWindow = infoWindow
    infoWindow.open(marker);
  }
}
