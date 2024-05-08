import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../../../core/services/utils.service';
import { AuthFirebaseService } from '../../../core/services/auth.firebase.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent  implements OnInit  {
  utislSvc = inject(UtilsService)
  authFire = inject(AuthFirebaseService)

  userLogin:boolean =this.authFire.userLogin;
  constructor(){
  }

  ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}
  goto(path: string) {
    this.utislSvc.goto(path)
  }
  logout(){
    this.authFire.logout()
    this.utislSvc.goto('home')
  }
}
