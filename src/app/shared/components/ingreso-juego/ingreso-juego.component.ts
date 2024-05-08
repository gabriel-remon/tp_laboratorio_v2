import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingreso-juego',
  standalone: true,
  imports: [],
  templateUrl: './ingreso-juego.component.html',
  styleUrl: './ingreso-juego.component.css'
})
export class IngresoJuegoComponent {

  @Input() text?:string;
  @Input() link?:string;
}
