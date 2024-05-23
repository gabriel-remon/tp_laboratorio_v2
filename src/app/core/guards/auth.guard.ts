import { inject } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

    
  const router = inject(Router)

  //const user =localStorage.getItem('user')

return new Promise((resolve)=>{
  onAuthStateChanged(getAuth(),auth=>{
  
    if(auth){// && user){
      resolve(true)
    }else{
      resolve(router.createUrlTree(['/auth/login']))
    }
  })
})
  
};
