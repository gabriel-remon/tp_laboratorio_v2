import { Component } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { InputCustomComponent } from '../../shared/components/input-custom/input-custom.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent,
    InputCustomComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonCustomComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin= new FormGroup ({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
  })

  submitLogin(){
    const auth = getAuth()
    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
    signInWithEmailAndPassword(auth,this.formLogin.value.email!,this.formLogin.value.password!).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    
  }
}
