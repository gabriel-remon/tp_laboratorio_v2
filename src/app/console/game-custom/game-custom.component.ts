import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-game-custom',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './game-custom.component.html',
  styleUrl: './game-custom.component.css'
})
export class GameCustomComponent {

}
