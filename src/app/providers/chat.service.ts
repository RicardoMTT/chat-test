import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje> | any;

  public chats:any;

  public usuario:any = {};

  public option:string = "";

  constructor(private afs: AngularFirestore,public auth: AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      console.log('user',user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  cargarMensajes(){

    this.itemsCollection = this.afs.collection<any>('chats',ref => ref.orderBy('fecha','desc').limit(5));
    // this.afs.collection<any>('random').valueChanges().subscribe(console.log)
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes:any)=>{
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

      })
    )
  }

  agregarMensaje(texto:string){
    let mensaje:Mensaje = {
      nombre:this.usuario.nombre,
      mensaje:texto,
      fecha:(new Date()).getTime(),
      uid:this.usuario.uid
    }
    return this.itemsCollection.add(mensaje);
  }
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(resp=>{
      console.log('resp',resp);
    });
  }
  logout() {
    this.usuario = {};
    this.auth.signOut();
  }
}
