import { ComponentFixture } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { RuletaComponent } from '../../shared/components/ruleta/ruleta.component';
import { AskedService } from '../../core/services/asked.service';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';

@Component({
  selector: 'app-asked',
  standalone: true,
  imports: [NavBarComponent, RuletaComponent, CommonModule, ButtonCustomComponent],
  templateUrl: './asked.component.html',
  styleUrl: './asked.component.css'
})
export class AskedComponent {


  askedSvc = inject(AskedService)
  score = 0;
  vidas = 3;
  jugando: boolean = false;

  srcImagen: any;
  pregunta: any;
  resultado:boolean=false;
  finJuego:boolean=false;
  opciones=[];
  categoriaPregunta?:String;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }


  conseguirPregunta(categoria: any) {
    this.askedSvc.conseguirImagen(categoria.categoria).subscribe(img => this.srcImagen = img.src.original)
    switch (categoria.value) {
      case 0:
        this.askedSvc.preguntaHistoria().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 1:
        this.askedSvc.preguntaArte().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 2:
        this.askedSvc.preguntaGeografia().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 3:
        this.askedSvc.preguntaPeliculas().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 4:
        this.askedSvc.preguntaDeportes().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 5:
        this.askedSvc.preguntaMatemaricas().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 6:
        this.askedSvc.preguntaComputadoras().subscribe(data => this.asignarRespuestas(data) )
        break;
      case 7:
        this.askedSvc.preguntaAnimales().subscribe(data => this.asignarRespuestas(data) )
        break;
    }
    this.categoriaPregunta=categoria.tipo;
  }

  asignarRespuestas(data:any){
    this.pregunta = data;
    data.incorrectas.concat( this.opciones.length)

    for(let i=0; i< data.incorrectas.length; i++){
      //@ts-ignore
      this.opciones.push(  data.incorrectas[i])

    }
    //@ts-ignore
    this.opciones.push(data.correcta) ;
    
    for (let i = this.opciones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.opciones[i], this.opciones[j]] = [this.opciones[j], this.opciones[i]];
    }
    this.jugando=true;
  }


  responderPregunta(respuesta:any ){
    if(respuesta == this.pregunta.correcta){
      this.score=this.score+20
      this.resultado=true
    }else{
      if(this.vidas==0){
        this.finJuego=true
      }else{
        this.vidas--
      }
      this.resultado=false
    }
    this.jugando=false

    setTimeout(() => {
      this.jugando=false;
      this.pregunta=null;
      this.opciones=[];
      this.srcImagen=null;
    }, 4000);
  }

  resetGame(){
      this.jugando=false;
      this.pregunta=null;
      this.opciones=[];
      this.srcImagen=null;
      this.finJuego=false;
      this.resultado=false;
      this.score = 0;
      this.vidas = 3;
  }

}
