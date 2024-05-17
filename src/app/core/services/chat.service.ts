import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable, inject } from '@angular/core';
import { MensajeChat } from '../models/chat.model';
import { Observable, map } from 'rxjs';
import { Firestore, query, collection,orderBy,limit ,onSnapshot, QuerySnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbMensajes = 'mensajes'

  firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)

  guardarMensaje(mensaje: MensajeChat) {
    mensaje.fecha= new Date() 

    return this.firestore.collection(this.dbMensajes).add(mensaje);
  }

  getMensajes() {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.dbMensajes)
    const q = query(mensajeRef,orderBy('fecha'),limit(3))

    onSnapshot(q,(snapshot:QuerySnapshot)=>{

    })
/*
    const mensajesObservable: Observable<MensajeChat[]> = ().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MensajeChat;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );*/

  }
  

  

}
