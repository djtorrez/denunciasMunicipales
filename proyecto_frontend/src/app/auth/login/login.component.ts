import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FbfuncionarioService } from '../../services/fbfuncionario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authForm!: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private firebaserSErvice:FirebaseService,private fbFuncionarioService:FbfuncionarioService){
    this.authForm = this.fb.group({
      // email: ['',[Validators.required, Validators.email]],
      // password:['',[Validators.required,Validators.minLength(8)]],
      username: ['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }

  login(){
    if (this.authForm.valid) {
      console.log("login!!!!");
      this.loading = true;
        this.fbFuncionarioService.loginFuncionario(this.authForm.value);
    }

    /* if (this.authForm.valid) {
      this.firebaserSErvice.login(this.authForm.value).then((res)=>{
        console.log(
          res
        );

      });
      // console.log('Es valido');

      // console.log(this.authForm.value.email);


    }else{
      console.log('evaluar las validaciones');
      console.log(this.authForm);
    } */
  }
  obtenerCurrentUser(){
     console.log(this.firebaserSErvice.losCurrentUsers());
  }

  verificarCorreo(){
    console.log(this.firebaserSErvice.enviarVerificacionDeCorreo());
  }

}
