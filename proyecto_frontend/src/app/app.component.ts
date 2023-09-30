import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatGPTResponse } from './interfaces/chatgpt';
import { Profile } from './interfaces/profile';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = "Heade"
  sideNavStatus:boolean = false
  ngOnInit(): void {

    // this.profileService.geProfile().subscribe((profile) => {
    //     this.profile = profile;
    //     console.log(this.profile);
    // });
  }

}
