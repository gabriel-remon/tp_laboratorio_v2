import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(),
    importProvidersFrom(provideFirebaseApp(() => 
      initializeApp(
        {
          apiKey: "AIzaSyD9GLiTw0R6Vf88-J0UP9x771PzEKJVXn8",
          authDomain: "saladejuegosrg-df69a.firebaseapp.com",
          projectId: "saladejuegosrg-df69a",
          storageBucket: "saladejuegosrg-df69a.appspot.com",
          messagingSenderId: "287213284680",
          appId: "1:287213284680:web:b77dbb241975c855f0577d"
        }))), 
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideDatabase(() => getDatabase()))
  ]
};
