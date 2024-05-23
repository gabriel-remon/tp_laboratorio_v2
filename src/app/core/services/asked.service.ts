import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { createClient } from 'pexels';


@Injectable({
  providedIn: 'root'
})
export class AskedService {


  private apiKeyImagen = "FoEGI758WpmXblPLKffHg56qSe860ZqIzKEKsBSaDKgxcHvOkm3PBy6c"
  client = createClient('YOUR_API_KEY');
  query = 'Nature'

  constructor() { }

  http  = inject(HttpClient)

  private conseguirPregunta(query:string){
    return this.http.get(query)
      .pipe(
        map((data: any) => 
          {
            let res = data.results[0]
            return {
              pregunta: res.question,
              correcta: res.correct_answer ,
              incorrectas: res.incorrect_answers
            }
          }
          ),
        catchError(err => {
          console.error('Error getting random word:', err);
          return of(null); // Handle error and return an empty string
        })
      );
  }

   conseguirImagen(categoria:string){
    return this.http.get(`https://api.pexels.com/v1/search?query=${categoria}&&per_page=5&&size=small`,{
      headers: {
        Authorization: `${this.apiKeyImagen}`,
        Accept: 'application/json'
      }
    })
    .pipe(
      map((data: any) =>{ 

        return data.photos[Math.floor(Math.random() *(data.photos.length-1))]}
      ),
      catchError(err => {
        console.error('Error getting random word:', err);
        return of(null); // Handle error and return an empty string
      })
    );

  }

  preguntaHistoria(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=23&difficulty=easy&type=multiple')
  }

  preguntaArte(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=25&difficulty=easy&type=multiple')
      
  }
  preguntaGeografia(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=22&difficulty=easy&type=multiple')
      
  }
  preguntaDeportes(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple')
      
  }
  preguntaMatemaricas(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=19&difficulty=easy&type=multiple')
      
  }
  preguntaComputadoras(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple')
      
  }
  preguntaPeliculas(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=11&difficulty=easy&type=multiple')
      
  }
  preguntaAnimales(){
    return this.conseguirPregunta('https://opentdb.com/api.php?amount=1&category=27&difficulty=easy&type=multiple')
      
  }
}
