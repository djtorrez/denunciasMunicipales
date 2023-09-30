import { Component, EventEmitter, Output } from '@angular/core';
import { Funcionario } from 'src/app/interfaces/funcionario';
import { FbfuncionarioService } from 'src/app/services/fbfuncionario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    @Output() sideNavToggled = new EventEmitter<boolean>();
    menuStatus: boolean = false;
    funcionario!:Funcionario
    constructor(private fbFuncionarioService:FbfuncionarioService){

    }
    ngOnInit(){
       this.funcionario = JSON.parse(localStorage.getItem("funcionario")!);
    }

    SideNavToggle(){
      this.menuStatus = !this.menuStatus;
      this.sideNavToggled.emit(this.menuStatus);
    }
    logOut(){
      this.fbFuncionarioService.logOutFuncionario();
    }
}
