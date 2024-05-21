import { Component, OnInit, inject } from '@angular/core';
import { UtilsService } from '../../../core/services/utils.service';
import { AuthFirebaseService } from '../../../core/services/auth.firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent  implements OnInit  {
  utislSvc = inject(UtilsService)
  authFire = inject(AuthFirebaseService)
  user:any;
  userLogin:boolean =this.authFire.userLogin;
  constructor(){
    
  }

  ngOnInit(): void {
     this.user=this.authFire.user;
   this.authFire.user$.subscribe((user)=>{
    this.user = user
   })}

  goto(path: string) {
    this.utislSvc.goto(path)
  }
  logout(){
    this.utislSvc.goto('')
    this.authFire.logout()
  }
}
