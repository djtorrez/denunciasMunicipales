import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamoRoutingModule } from './reclamo-routing.module';
import { AllreclamosComponent } from './pages/allreclamos/allreclamos.component';
import { ReclamosmapComponent } from './pages/reclamosmap/reclamosmap.component';
import { SharedModule } from '../shared/shared.module';
import { VistasReclamoComponent } from './vistas-reclamo.component';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { GetreclamoComponent } from './pages/getreclamo/getreclamo.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { AreasComponent } from './pages/areas/areas.component';
import { DetalleAreaComponent } from './pages/detalle-area/detalle-area.component';

@NgModule({
  declarations: [
    AllreclamosComponent,
    ReclamosmapComponent,
    VistasReclamoComponent,
    GetreclamoComponent,
    ProfileComponent,
    EstadosComponent,
    CategoriasComponent,
    FuncionariosComponent,
    BienvenidoComponent,
    AreasComponent,
    DetalleAreaComponent
  ],
  imports: [
    CommonModule,
    ReclamoRoutingModule,
    RouterModule,
    FormsModule,
    SharedModule,
    GoogleMapsModule
  ]
})
export class ReclamoModule { }
