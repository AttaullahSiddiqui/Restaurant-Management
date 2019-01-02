import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor() { }

  userNameSpaceValidator(control: FormControl) { 
    let userName = control.value;
    if(userName){
      var isValid = userName.split(' ');
      if(isValid.length >= 2)
      return {
        noSpaceAllow : true
      }
    }
    return null;
  };
}
