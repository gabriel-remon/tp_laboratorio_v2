import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { TecladoComponent } from '../../shared/components/teclado/teclado.component';
import { HttpService } from '../../core/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-hanged',
  standalone: true,
  imports: [NavBarComponent,TecladoComponent,ReactiveFormsModule,NgxSpinnerModule],
  templateUrl: './hanged.component.html',
  styleUrl: './hanged.component.css'
})
export class HangedComponent {

  exitosos:number=0;
incorrectos:number=0;
palabra:string="";
contenedorLetras:any=[];
httpSvc = inject(HttpService)
spinner = inject(NgxSpinnerService)
letras:any;
scrAhorcado:string ="assets/ahorcado/ahorcado"
imagenAhorcado:string=this.scrAhorcado+".0.jpg";
finJuego:boolean=false;

  ngOnInit(): void {
    this.spinner.show();

    this.obtenerPalabra()
  }

  obtenerPalabra(){
    this.httpSvc.getRandomWord().subscribe((data)=>{
      if(data && data[0].length >3 && data[0].length <9){
        this.palabra=data[0].toUpperCase()
        const normalizedText =  this.palabra.normalize("NFD");
        this.palabra = normalizedText.replace(/[\u0300-\u036F]/g, "");
        this.spinner.hide();

        this.mostrarContenedores()
      }else{
          this.obtenerPalabra()
        }
      
    })}

    mostrarContenedores(){
      let contenedores =  document.getElementsByClassName('letra')
      this.contenedorLetras = contenedores
      for(let i=0;i<this.palabra.length;i++){
        contenedores[i].classList.remove('hide')
      }
    }

    intentarLetra(letra:string){
      
      if(this.palabra.includes(letra) && this.incorrectos<6){
        let indices = []
        let indice;
        do{

          indice=this.palabra.indexOf(letra)
         
          if(indice!==-1){
            indices.push(indice)
            this.palabra = this.palabra.substring(0,indice)+" "+this.palabra.substring(indice+1,this.palabra.length)
          }
        }while(indice!==-1)
          this.agregarLetras(letra,indices)
          this.exitosos++
      }else{
        this.incorrectos++
        this.imagenAhorcado = this.scrAhorcado+"."+this.incorrectos+".jpg"
  
      }
      this.estadoJuego()
    }

    agregarLetras(letraIn:string,index:any,incorrectos?:boolean){
      for(let i=0;i<index.length;i++){
        const letra=document.createElement('p')
        letra.textContent= letraIn.toUpperCase()
        letra.style.margin='0'
        if(incorrectos)letra.style.color = "red"
        this.contenedorLetras[index[i]].appendChild(letra)

      }
    }

    estadoJuego(){
      if(this.incorrectos == 6){
        document.getElementById('teclado')?.classList.add('hide')
        this.finJuego=true
        let arrayAux=[];
        for (const char of this.palabra) {
          arrayAux.push(char);
        }
        arrayAux.forEach((value,index)=>{
          if(value!== " "){
            let indexAux =[]
            indexAux.push(index)
            this.agregarLetras(value,indexAux,true)
          }
        })
      }
      if(this.palabra.trim().length==0){
        document.getElementById('teclado')?.classList.add('hide')
        this.finJuego=true
        //ganaste
      }
    }

    dibujarAhorcado(){

    }

}
