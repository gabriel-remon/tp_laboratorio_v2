import { MensajeChat } from './../models/chat.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Firestore, query, collection,orderBy,limit ,onSnapshot, QuerySnapshot, addDoc, getFirestore, QueryDocumentSnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbMensajes = 'mensajes'

  //firestore = inject(AngularFirestore)
  dbFirebase =inject( Firestore)

  guardarMensaje(mensaje: MensajeChat) {
 
    mensaje.fecha = new Date().toLocaleString('es-AR', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })

    addDoc(collection(getFirestore(),this.dbMensajes),mensaje).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  getMensajes(funcion:(mensajes:MensajeChat[])=>void) {
    // Crear una consulta ordenada por el campo 'fecha' en orden ascendente
    const mensajeRef = collection(this.dbFirebase,this.dbMensajes)
    const q = query(mensajeRef,orderBy('fecha'))
    
    return onSnapshot(q,(snapshot:QuerySnapshot)=>{
      let mensajes :MensajeChat[] =[];
      snapshot.forEach((doc:QueryDocumentSnapshot)=>{
        let mensajeIn =  doc.data() as MensajeChat
        mensajes.push( mensajeIn)
      })
      funcion(mensajes)
    })}
/*
    const mensajesObservable: Observable<MensajeChat[]> = ().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MensajeChat;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );*/

  }
  

  

