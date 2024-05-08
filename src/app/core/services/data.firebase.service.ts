import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { getFirestore,setDoc,doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataFirebaseService {

  private bdUsuarios = "usuarios"
  private bdLogin = "login"

  constructor(private dbFirebase : Firestore) { }

  addNewUser(user:User){
    addDoc(collection(getFirestore(),this.bdUsuarios),user).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  addNewLogin(uid:string){
    const data={
      idUsuario: uid,
      hora: new Date()
    }

    addDoc(collection(getFirestore(),this.bdLogin),data).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

}
