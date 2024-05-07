import { Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { MainComponent } from './main/main.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

export const home_routes: Routes = [
    {
        path: '',
        component:MainComponent
    },
    {
        path: 'chat',
        component:ChatRoomComponent
    },
    {
        path: 'aboutme',
        component:AboutMeComponent
    }
];
