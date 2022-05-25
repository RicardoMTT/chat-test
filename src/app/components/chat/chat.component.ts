import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensaje: string = '';

  element: any;

  constructor(public chatService: ChatService) {
    if (this.chatService.option == 'Random') {
      this.chatService.cargarMensajesRandom().subscribe(() => {
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
      });
    } else {
      this.chatService.cargarMensajes().subscribe(() => {
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
      });
    }
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  enviarMensaje() {
    if (this.mensaje.length !== 0) {
      this.chatService.agregarMensaje(this.mensaje);
      this.mensaje = '';
    }
  }
}
