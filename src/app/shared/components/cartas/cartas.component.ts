import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [],
  templateUrl: './cartas.component.html',
  styleUrl: './cartas.component.css'
})
export class CartasComponent {
  
  @Output() cartaElegida = new EventEmitter<{name:string|null,number:number|null }>();
  cartasActuales:number=48;
  cartaAnterior:any;
  cartasHtml:any;
  CartaSeleccionada:string ="";
  cartaSeleccionadaHtml:any
  cartas=[
    [1,2,3,4,5,6,7,8,9,10,11,12], //espada
    [1,2,3,4,5,6,7,8,9,10,11,12], //basto
    [1,2,3,4,5,6,7,8,9,10,11,12], //copa
    [1,2,3,4,5,6,7,8,9,10,11,12]  //oro
  ]

  ngOnInit(): void {
    this.cartasHtml = document.querySelectorAll('img')
  }

  elegirCarta(){
    if(this.cartasActuales==0){
      return
    }

    let mazo 
    let carta
    let tipoCarta:string="";

    do{
     mazo = Math.floor(Math.random() * this.cartas.length);

    }while(this.cartas[mazo].length===0)

    do{
      carta = Math.floor(Math.random() * this.cartas[mazo].length);
    }while(carta==this.cartaAnterior)

    this.cartasActuales--
  
    switch(mazo){
      case 0:
        tipoCarta="espada"
        break;
    
      case 1:
        tipoCarta="basto"
        break;
    
      case 2:
        tipoCarta="copa"
        break;
    
      case 4:
        tipoCarta="oro"
        break;
      }

      this.cartaElegida.emit({
        name: carta+" de "+ tipoCarta,
        number: carta
      })

      this.cartaAnterior=  this.cartas[mazo].splice(carta-1,1)[0]
      console.log(this.cartas)
      this.eliminarCarta()
  }

  eliminarCarta(){
    if(this.cartasActuales > 14 && this.cartasActuales>0){
      return
    }

    if(this.cartasActuales == 13)this.cartasHtml[0].classList.add('hide')
    if(this.cartasActuales == 12)this.cartasHtml[12].classList.add('hide')
    if(this.cartasActuales == 11)this.cartasHtml[1].classList.add('hide')
    if(this.cartasActuales == 10)this.cartasHtml[11].classList.add('hide')
    if(this.cartasActuales == 9)this.cartasHtml[2].classList.add('hide')
    if(this.cartasActuales == 8)this.cartasHtml[10].classList.add('hide')
    if(this.cartasActuales == 7)this.cartasHtml[3].classList.add('hide')
    if(this.cartasActuales == 6)this.cartasHtml[9].classList.add('hide')
    if(this.cartasActuales == 5)this.cartasHtml[4].classList.add('hide')
    if(this.cartasActuales == 4)this.cartasHtml[8].classList.add('hide')
    if(this.cartasActuales == 3)this.cartasHtml[5].classList.add('hide')
    if(this.cartasActuales == 2)this.cartasHtml[7].classList.add('hide')
    if(this.cartasActuales == 1)this.cartasHtml[6].classList.add('hide')
  }

  mostrarCarta(mazo:string,carta:number){
    this.CartaSeleccionada="assets/"+mazo+"."+carta+".png";

  }
}
