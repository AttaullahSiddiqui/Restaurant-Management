import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public setToken(data:string){
    localStorage.setItem('Authorization', data);
  }

  public getToken() : string{
    return localStorage.getItem('Authorization');
  }
}
