import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { CartasComponent } from '../../shared/components/cartas/cartas.component';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NavBarComponent,CartasComponent,ButtonCustomComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  puntos:number=0
  incorrectos:number=4;
  estadoTablero:boolean=false
  cartaAnterior:any;
  estadoElegida:boolean=false;
  apuesta!:boolean;// false: apuesta mayor -- true: apuesta por menor
  estadoApuesta!:boolean;
  primeraApuesta:boolean=false;
  juegoTerminado:boolean=false;


  eleccionCarta(carta:any){
 

    if(this.cartaAnterior){
      this.primeraApuesta=true
      if(this.apuesta){
        if(carta.number < this.cartaAnterior.number){
          this.estadoApuesta = true;
          this.puntos= this.puntos + 20;
        }else{
          this.estadoApuesta = false;
          this.incorrectos--
        }
      }else{
        if(carta.number > this.cartaAnterior.number){
          this.estadoApuesta = true;
          this.puntos= this.puntos + 20;
        }else{
          this.incorrectos--
          this.estadoApuesta = false;
        }
      }
    }
    if(!this.estadoTablero){
      this.estadoTablero=true
      this.estadoElegida=true;
      this.cartaAnterior= carta
    }

    if(this.incorrectos===0)setTimeout(() => {
      
      this.juegoTerminado=true
    }, 2000);
  }

  realizarApuesta(apuesta:boolean){
    this.estadoTablero=false;
    this.estadoElegida=false;
    this.apuesta=apuesta
  }

}
