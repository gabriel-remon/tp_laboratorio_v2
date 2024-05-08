import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import Typed from 'typed.js';
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {
  ngOnInit(){
    const options = {
      strings: ["programador","vendedor","tecnico electronico"],
      typeSpeed: 100,
      backSpeed: 100,
      backDelay: 1000,
      showCursor: true,
      cursorChar: '|',
      loop: true
 };
     
 const typed = new Typed('.cambio', options);
  }

  
}
