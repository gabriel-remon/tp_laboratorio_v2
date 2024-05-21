import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-teclado',
  standalone: true,
  imports: [],
  templateUrl: './teclado.component.html',
  styleUrl: './teclado.component.css'
})
export class TecladoComponent {

  letras:any;
  letrasEnviadas:any=[];
  @Output() teclaPulsada = new EventEmitter<string>();

  ngOnInit(): void {
    this.letras = document.getElementsByClassName('recuadro')
  }


  enviarLetra(letra:string){
    if(!this.letrasEnviadas.includes(letra)){
      this.letrasEnviadas.push(letra)
      document.getElementById(letra)?.classList.add('hide')
      this.teclaPulsada.emit(letra)
    }
  }

}
