import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  http  = inject(HttpClient)
  getRandomWord() {
    
    return this.http.get('https://clientes.api.greenborn.com.ar/public-random-word')
    //return this.http.get('https://random-word-api.herokuapp.com/word?lang=es')
      .pipe(
        map((data: any) => data),
        catchError(err => {
          console.error('Error getting random word:', err);
          return of(null); // Handle error and return an empty string
        })
      );}
}
