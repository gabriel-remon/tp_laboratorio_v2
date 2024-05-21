import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { InputCustomComponent } from '../../shared/components/input-custom/input-custom.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonCustomComponent } from '../../shared/components/button-custom/button-custom.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UtilsService } from '../../core/services/utils.service';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';
import { UserModel } from '../../core/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavBarComponent,
    InputCustomComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonCustomComponent,
    NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form= new FormGroup ({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)]),
  })
  constructor( private toast:ToastrService, private spinner:NgxSpinnerService){}

  utilSvc = inject(UtilsService)
  authFire = inject(AuthFirebaseService)

  goto(path:string){
    this.utilSvc.goto(path)
  }

  async submit(){
 
    const user = {
      name:this.form.value.name,
      email:this.form.value.email
    }
    this.spinner.show();
    await this.authFire.register(user as UserModel,this.form.value.password!,()=>{
      this.utilSvc.goto('')
      this.toast.success("usuario logueado con exito","Bienvenido")
    });
    this.spinner.hide();
  }
}
