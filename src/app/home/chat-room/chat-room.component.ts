import { MensajeChat } from './../../core/models/chat.model';
import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';
import { ChatService } from '../../core/services/chat.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [NavBarComponent,CommonModule,ButtonCustomComponent,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent {


  chatsFirebase:MensajeChat[]=[];
  
  spinner = inject(NgxSpinnerService)
  authFire = inject(AuthFirebaseService)
  user:any;

  form= new FormGroup ({
    mensaje: new FormControl('',[Validators.required,Validators.minLength(1)])
  })

  ngOnInit(){
    this.user = this.authFire.user
    this.spinner.show();
    this.chatSvc.getMensajes((data)=>{
      this.chatsFirebase=data
      console.log( this.chatsFirebase)
      console.log( this.user)
      setTimeout(() => {
        this.mostrarUltimoMensaje()
      }, 50);
    },()=>{this.spinner.hide()})
  }
  
  chatSvc = inject(ChatService)
  enviarMensaje(){
    let mensaje = this.form.value as MensajeChat
    mensaje._uid=this.user.uid
    mensaje.name=this.user.displayName
    this.form.patchValue({mensaje:""})
    this.chatSvc.guardarMensaje(mensaje)
    
  }


  mostrarUltimoMensaje(){
    
    let listaMensajes = document.getElementById('contenedorMensajes');
    listaMensajes?.scrollTo({
      top: listaMensajes.scrollHeight,
      behavior: 'smooth'
    });
  }
}
