import { MensajeChat } from './../../core/models/chat.model';
import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';
import { ChatService } from '../../core/services/chat.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [NavBarComponent,CommonModule,ButtonCustomComponent,ReactiveFormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent {

  id_logueado = 'donPepito';
 /* chats : MensajeChat[] = [
    {_uid:'donPepito',
      name:'Don Pepito',
      fecha: new Date(),
      mensaje:'hola don pepito'
    },
    {_uid:'donJose',
      name:'Don Jose',
      fecha: new Date(),
      mensaje:'hola don jose'
    },
    {_uid:'donPepito',
      name:'Don Pepito',
      fecha: new Date(),
      mensaje:'hola don pepito'
    },
    {_uid:'donJose',
      name:'Don Jose',
      fecha: new Date(),
      mensaje:'hola don jose'
    },
    {_uid:'donPepito',
      name:'Don Pepito',
      fecha: new Date(),
      mensaje:'chupame un huevo puto'
    },
    {_uid:'donJose',
      name:'Don Jose',
      fecha: new Date(),
      mensaje:'andate a labar el orto hijo de una gran puta'
    },
    {_uid:'donPepito',
      name:'Don Pepito',
      fecha: new Date(),
      mensaje:'Tu vieja le enseño a hacer los mejores petes a tu hermana'
    },
    {_uid:'donJose',
      name:'Don Jose',
      fecha: new Date(),
      mensaje:'anda a hacer que te cojan pedaño de puto ninguna mina te la debe ni oler forro'
    },
  ]*/

  chatsFirebase:MensajeChat[]=[];

  form= new FormGroup ({
    mensaje: new FormControl('',[Validators.required,Validators.minLength(1)])
  })

  ngOnInit(){
    this.chatSvc.getMensajes((data)=>{
      this.chatsFirebase=data
      console.log( this.chatsFirebase)
    })
  }
  
  chatSvc = inject(ChatService)
  enviarMensaje(){
    let mensaje = this.form.value as MensajeChat
    mensaje._uid=this.id_logueado
    mensaje.name="pepe"
    this.form.patchValue({mensaje:""})
    this.chatSvc.guardarMensaje(mensaje)
  }
}
