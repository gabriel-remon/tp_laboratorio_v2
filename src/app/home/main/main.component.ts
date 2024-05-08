import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { InputCustomComponent } from '../../shared/components/input-custom/input-custom.component';
import { IngresoJuegoComponent } from '../../shared/components/ingreso-juego/ingreso-juego.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavBarComponent,InputCustomComponent,IngresoJuegoComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  linkJuego1="./assets/preguntados.png"
  textJuego1="preguntados";
  linkJuego2="./assets/ahorcado.png"
  textJuego2="ahorcado";
  linkJuego3="./assets/cartas.jpg"
  textJuego3="mayor o menor";
  linkJuego4="./assets/juego.jpg"
  textJuego4="P.P.T.L.S.";


}
