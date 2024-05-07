import { MatIconModule } from '@angular/material/icon';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [MatIconModule,ReactiveFormsModule],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css'
})
export class InputCustomComponent {
  @Input() text='hola'
  @Input() icon!:string;
  @Input() type!:string;
  @Input() control!:FormControl;
}
