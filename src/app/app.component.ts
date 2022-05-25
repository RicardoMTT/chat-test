import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chat-app';
  public chats$: any;
  public hasSelected: boolean = false;

  optionSelected: string = '';

  public options: string[] = ['Random', 'Default'];

  constructor(public db: AngularFirestore, public chatService: ChatService) {
    this.chats$ = db.collection('chats').valueChanges();
  }

  selectOption(option: string) {
    this.hasSelected = true;
    this.optionSelected = option;
    this.chatService.option = option;
  }
}
