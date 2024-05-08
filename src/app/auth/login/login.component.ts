import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { InputCustomComponent } from '../../shared/components/input-custom/input-custom.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';
import { UtilsService } from '../../core/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import {  NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavBarComponent,
    InputCustomComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonCustomComponent,
    NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private toast:ToastrService, private spinner:NgxSpinnerService) {}

  formLogin= new FormGroup ({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
  })

  authFirebase = inject(AuthFirebaseService)
  utilSvc = inject(UtilsService)

  goto(path:string){
    this.utilSvc.goto(path)
  }
  
  async submitLogin(){

    this.spinner.show();
    await this.authFirebase.login(this.formLogin.value.email!,this.formLogin.value.password!,()=>{
      this.utilSvc.goto('')
      this.toast.success("usuario logueado con exito","Bienvenido")
    })
    
    this.spinner.hide();
    //const res = this.localStorage.login(this.formLogin.value)?"usuario logeado":"no se encontro el usuario"
  }

  accesoRapido(email:string,password:string){
    this.formLogin.patchValue({
      email: email,
      password: password
    });
  }
}
