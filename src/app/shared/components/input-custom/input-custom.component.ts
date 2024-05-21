import { MatIconModule } from '@angular/material/icon';
import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(){
    if(this.type=="password"){
      this.icon="lock"
    }
    if(!this.icon){
      this.icon="people"
    }
  }
  viewPassword(){
    if(this.icon == "lock"){
      this.icon = "lock_open"
      this.type="text"
    }else if(this.icon == "lock_open"){
      this.icon = "lock"
      this.type="password"
    }

  
  }
}
