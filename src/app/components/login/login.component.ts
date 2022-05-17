import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private chatService:ChatService) { }
  @Input() option = "";
  ngOnInit(): void {
  }

  ingresar(provider:string){
    console.log(provider);

    this.chatService.login();

  }
}
