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

  public removeToken(){
    localStorage.removeItem('Authorization');
  };

  public getUserRoles() {
    const USER_ROLES = [
      {
        name: 'Admin',
        value: 1,
      },{
        name: 'Manager',
        value: 2,
      },{
        name: 'Cashier',
        value: 3,
      },{
        name: 'Other',
        value: 4,
      }
    ]
    return USER_ROLES;
  };
}
