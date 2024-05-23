import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ruleta',
  standalone: true,
  imports: [],
  templateUrl: './ruleta.component.html',
  styleUrl: './ruleta.component.css'
})
export class RuletaComponent {

  ruleta: any;
  girando: boolean = false;
  @Output() cartaElegida = new EventEmitter<{ categoria: string | null, value: number | null ,tipo:string|null}>();

  ngOnInit(): void {
    this.ruleta = document.querySelector('#ruleta');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }


  giros = 0;

  valor: any;

  girar() {
    if (!this.girando) {
      let rand = Math.random() * 7200;
      this.calcular(rand);
      this.giros++;

    }
    //var sonido = document.querySelector('#audio');
    //sonido?.setAttribute('src', 'sonido/ruleta.mp3');

    /*
          Swal.fire({
            icon: 'success',
            title: 'VUELVA PRONTO EL JUEGO TERMINO!!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false
          }).then((result)=>{
            if (result.value == true) {
              giros = 0;
               document.querySelector('.elije').innerHTML = 'TU CORTESIA ES: ';
               document.querySelector('.contador').innerHTML = 'TURNOS: ' + giros;        
            }
          })*/
  }



  calcular(rand: number) {


    let valor;
    let categoria;
    let tipo;
    this.valor = rand / 360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0])) * 360;
    this.ruleta.style.transform = "rotate(" + rand + "deg)";


    this.girando = true;
    setTimeout(() => {
      switch (true) {
        case this.valor > 0 && this.valor <= 45:
          valor = 0;
          categoria = "historia"
          tipo = "historia"
          console.log("resultado ruleta: caso 0, 2 estrellas (historia)");
          break;
        case this.valor > 45 && this.valor <= 90:
          valor = 1;
          categoria = "arte"
          tipo = "arte"
          console.log("resultado ruleta: caso 1, 5 Piezas (arte)");
          break;
        case this.valor > 90 && this.valor <= 135:
          valor = 2;
          categoria = "paisaje"
          tipo = "geografia"
          console.log("resultado ruleta: caso 2, 2 Corazón (geografia)");
          break;
        case this.valor > 135 && this.valor <= 180:
          valor = 3;
          categoria = "peliculas"
          tipo = "peliculas"
          console.log("resultado ruleta: caso 3, 2 Nigiri (peliculas)");
          break;
        case this.valor > 180 && this.valor <= 225:
          valor = 4;
          categoria = "deportes"
          tipo = "deportes"
          console.log("resultado ruleta: caso 4, Handroll Mini (deportes)");
          break;
        case this.valor > 225 && this.valor <= 270:
          valor = 5;
          categoria = "numeros"
          tipo = "matematicas"
          console.log("resultado ruleta: caso 5, NO HAY CORTESIAS ESTA VEZ (matematicas)");
          break;
        case this.valor > 270 && this.valor <= 315:
          valor = 6;
          categoria = "computacion"
          tipo = "computacion"
          console.log("resultado ruleta: caso 6, Una Coca Cola de 2L (computacion)");
          break;
        case this.valor > 315 && this.valor <= 360:
          valor = 7;
          categoria = "animales"
          tipo = "animales"
          console.log("resultado ruleta: caso 7, 2 Enjoy (animales)");
          break;
      }

      this.cartaElegida.emit({
        tipo: tipo,
        categoria: categoria,
        value: valor
      })
      this.girando = false;
    }, 5000);

  }



}
