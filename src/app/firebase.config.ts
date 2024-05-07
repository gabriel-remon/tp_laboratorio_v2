import { EnvironmentProviders, importProvidersFrom } from '@angular/core';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';

    const firebaseProviders: EnvironmentProviders = importProvidersFrom(
        provideFirebaseApp(() =>
            initializeApp(environment.firebaseConfig)
        ),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase())
    );

export {firebaseProviders};