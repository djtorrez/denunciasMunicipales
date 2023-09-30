import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatGPTResponse } from 'src/app/interfaces/chatgpt';
import { Profile } from 'src/app/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-chatgpt',
  templateUrl: './chatgpt.component.html',
  styleUrls: ['./chatgpt.component.css']
})
export class ChatgptComponent {
  @ViewChild('chatInput') chatInput!: ElementRef;
  title = 'proyecto-topicos';
  profile!: Profile;
  typedText = '';
  animationComplete = false;
  spinner = false;
  palabras: any[] = [];
  chatGtpResponse?: ChatGPTResponse;
  public formChat!: FormGroup

  constructor(private profileService: ApiService, private formBuilder: FormBuilder) {
    this.formChat = this.formBuilder.group({
      texto: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {

    // this.profileService.geProfile().subscribe((profile) => {
    //     this.profile = profile;
    //     console.log(this.profile);
    // });
  }

  efectoTyping() {
    console.log(this.formChat.value);
    let userText = {
      user: 'Me',
      msg: this.formChat.value.texto
    }
    this.palabras.push(userText)
    let request = {
      pregunta: this.formChat.value.texto
    }
    this.chatInput!.nativeElement.value = ""
    this.spinner = true;
    /* Llamamos al servicio de Chat GPT */
    this.profileService.geMsgChatGpt(request).subscribe((response) => {
      this.chatGtpResponse = response;
      console.log(this.chatGtpResponse);
      const inputText = this.chatGtpResponse.body?.choices![0].text //variable a la que le pasamos el valor del txt de la respuesta para hacer la animacion
      this.spinner = false;
      /*Empezamos a animar el texto */
      this.animationComplete = true;
      let i = 0;
      const typingSpeed = 70; // Velocidad de escritura en milisegundos
      const typingTimer = setInterval(() => {
        this.typedText += inputText?.charAt(i);
        i++;
        if (i === inputText?.length) {
          clearInterval(typingTimer);
          setTimeout(() => {
            let gptText = {
              user: 'ChatGPT',
              msg: this.typedText
            }
            this.palabras.push(gptText)
            this.typedText = '';
            this.animationComplete = false;
            /*Finalizacion de la animacion */
          }, 1000); // Retraso para indicar que la animación ha terminado
        }
      }, typingSpeed);
    });
  }
}
