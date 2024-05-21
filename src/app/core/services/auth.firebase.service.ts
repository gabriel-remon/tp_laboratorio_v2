
import { Injectable, inject, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword ,onAuthStateChanged, createUserWithEmailAndPassword, getAuth, Unsubscribe ,signOut,User, updateProfile } from '@angular/fire/auth';
import { UtilsService } from './utils.service';
import { UserModel } from '../models/user.model';
import { DataFirebaseService } from './data.firebase.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService  {
  
    UtilsSvc = inject(UtilsService)
    fireStore = inject(DataFirebaseService)
    userLogin:boolean=false;
    user:any;

  /*constructor(public auth: Auth,private toast:ToastrService) { 
    onAuthStateChanged(getAuth(),(user)=>{
      if(user){
        this.user=user
        console.log("bienvenido")
      }else{
        console.log("el usuairo no esta logueado")
      }
    })
  }*/


  private userSubject = new Subject<any>(); // Subject to store the user state
  user$: Observable<any>;
  private unsubscribeSubscription: Unsubscribe  | undefined;

  constructor(public auth: Auth, private toast: ToastrService) {
    this.user$ = this.userSubject.asObservable(); // Make user data observable

    this.unsubscribeSubscription = onAuthStateChanged(getAuth(),
      (user) => {
        if (user) {
          this.user=user
          this.userSubject.next(user); 
          console.log("Bienvenido");
        } else {
          this.user=null
          this.userSubject.next(null); 
          console.log("El usuario no está logueado");
        }
      },
      (error) => {
        // Handle errors (optional)
        console.error('Error al obtener el estado de autenticación:', error);
      }
    );
  }
/*
  ngOnDestroy(): void {
    if (this.unsubscribeSubscription) {
      this.unsubscribeSubscription.unsubscribe(); // Unsubscribe on destroy
    }
  }*/



  async login(email:string,password:string,calback?:()=>void){   
    await signInWithEmailAndPassword(this.auth,email!,password!).then(res=>{
      this.userLogin=true;
      this.user=res.user
      this.userSubject.next(res.user);
      this.fireStore.addNewLogin(res.user.uid)
    if(calback)calback()
  }).catch(err=>{
    this.toast.error(err.message,"Error")
    console.log(err)
  })}

  async register(user:UserModel,password:string,calback?:()=>void){   
    await createUserWithEmailAndPassword(this.auth,user.email,password).then(res=>{
      user._uid=res.user.uid
      this.userLogin=true;
      this.user=res.user
      this.fireStore.addNewUser(user)
      this.fireStore.addNewLogin(res.user.uid)
      this.userSubject.next(res.user);
      this.actualizarUsuario({displayName:user.name})
      if(calback)calback()
    }).catch(err=>{
      this.toast.error(err.message,"Error")
    console.log(err)
  })}


  actualizarUsuario({ displayName, photoURL: photoUrl }: { displayName?: string | null | undefined; photoURL?: string | null | undefined; }){
    updateProfile(this.user,{displayName})
  }


  logout(){
    
    signOut(getAuth())
    .then(()=>
      {console.log("usuario deslogeado"),this.user=null})
    .catch(()=>
      {console.log("error en el deslogueo")})
  }
}
