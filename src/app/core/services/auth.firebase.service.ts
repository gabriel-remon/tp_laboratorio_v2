
import { Injectable, inject, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword ,onAuthStateChanged, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { UtilsService } from './utils.service';
import { User } from '../models/user.model';
import { DataFirebaseService } from './data.firebase.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService  {
  
    UtilsSvc = inject(UtilsService)
    fireStore = inject(DataFirebaseService)
    userLogin:boolean=false;
    user:any;

  constructor(public auth: Auth,private toast:ToastrService) { 
    
  }



  async login(email:string,password:string,calback?:()=>void){   
    await signInWithEmailAndPassword(this.auth,email!,password!).then(res=>{
      this.userLogin=true;
      this.user=res.user
      this.fireStore.addNewLogin(res.user.uid)
    if(calback)calback()
  }).catch(err=>{
    this.toast.error(err.message,"Error")
    console.log(err)
  })}

  async register(user:User,password:string,calback?:()=>void){   
    await createUserWithEmailAndPassword(this.auth,user.email,password).then(res=>{
      user._uid=res.user.uid
      this.userLogin=true;
      this.user=res.user
      this.fireStore.addNewUser(user)
      this.fireStore.addNewLogin(res.user.uid)
      if(calback)calback()
    }).catch(err=>{
      this.toast.error(err.message,"Error")
    console.log(err)
  })}




  logout(){
    this.userLogin=false
    this.user=null
  }
}
