import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatgptComponent } from './home/chatgpt/chatgpt.component';
import { VistasReclamoComponent } from './reclamo/vistas-reclamo.component';
//GUARD
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },//Inicio
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard',
  component: VistasReclamoComponent,
  loadChildren:() => import('../app/reclamo/reclamo.module')
  .then(m => m.ReclamoModule),
  // ...canActivate( () => redirectUnauthorizedTo(['/login']))
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
