import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistasReclamoComponent } from './vistas-reclamo.component';
import { AllreclamosComponent } from './pages/allreclamos/allreclamos.component';
import { ReclamosmapComponent } from './pages/reclamosmap/reclamosmap.component';
import { GetreclamoComponent } from './pages/getreclamo/getreclamo.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { AreasComponent } from './pages/areas/areas.component';
import { DetalleAreaComponent } from './pages/detalle-area/detalle-area.component';

// const routes: Routes = [];

const routes: Routes = [
  {
    path: 'dashboard', component: VistasReclamoComponent, children: [
      { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
      { path: 'allreclamos', component: AllreclamosComponent },
      { path: 'bienvenido', component: BienvenidoComponent },
      { path: 'allreclamosmap', component: ReclamosmapComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'getreclamo/:id', component: GetreclamoComponent },
      { path: 'getarea/:id', component: DetalleAreaComponent },
      { path: 'categorias', component: CategoriasComponent },
      { path: 'estados', component: EstadosComponent },
      { path: 'funcionarios', component: FuncionariosComponent },
      { path: 'areas', component: AreasComponent },
       { path: '**', redirectTo: 'bienvenido', pathMatch: 'full' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReclamoRoutingModule { }
