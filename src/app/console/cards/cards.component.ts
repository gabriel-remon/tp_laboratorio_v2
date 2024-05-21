import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { CartasComponent } from '../../shared/components/cartas/cartas.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NavBarComponent,CartasComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {



}
