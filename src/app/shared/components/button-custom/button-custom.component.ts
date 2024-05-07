import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [],
  template:'<button [type]="type" class="btn" [disabled]="disabled">{{text}}</button>',
  styleUrl: './button-custom.component.css'
})
export class ButtonCustomComponent {

  @Input() text!:string;
  @Input() type!:string;
  @Input() disabled!:boolean;

}
