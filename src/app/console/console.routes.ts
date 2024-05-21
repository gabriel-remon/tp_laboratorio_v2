import { Routes } from '@angular/router';
import { AskedComponent } from './asked/asked.component';
import { CardsComponent } from './cards/cards.component';
import { GameCustomComponent } from './game-custom/game-custom.component';
import { HangedComponent } from './hanged/hanged.component';

export const console_routes: Routes = [
   
    {
        path: 'asked',
        component:AskedComponent
    },
    {
        path: 'cards',
        component:CardsComponent
    },
    {
        path: 'custom',
        component:GameCustomComponent
    },
    {
        path: 'hanged',
        component:HangedComponent
    }
];
