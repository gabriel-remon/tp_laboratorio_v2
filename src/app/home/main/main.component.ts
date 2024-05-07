import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { InputCustomComponent } from '../../shared/components/input-custom/input-custom.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavBarComponent,InputCustomComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
