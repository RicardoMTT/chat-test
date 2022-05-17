import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensaje: string = "";

  element:any;

  constructor(public chatService: ChatService) {
    console.log(this.chatService.option);

    this.chatService.cargarMensajes().subscribe(()=>{
      setTimeout(()=>{
        this.element.scrollTop = this.element.scrollHeight;
      },20);
    });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    console.log(this.mensaje.length);

    if (this.mensaje.length !== 0) {
      this.chatService.agregarMensaje(this.mensaje);
      this.mensaje = "";
    }
  }
}
