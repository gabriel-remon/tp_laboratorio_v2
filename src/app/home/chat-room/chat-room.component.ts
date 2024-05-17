import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { MensajeChat } from '../../core/models/chat.model';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent {

  chats : MensajeChat[] = [
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
  ]

}
