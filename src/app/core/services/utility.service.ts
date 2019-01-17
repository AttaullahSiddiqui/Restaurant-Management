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
    const USER_ROLES = [{
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

  public findUpdatedProperty(updatedData, oldData){
    let isUpdated = false;
    let finalUpdatedObj = {};
    Object.keys(updatedData).forEach( key => {
      if(oldData[key] != updatedData[key]){
        isUpdated = true;
        finalUpdatedObj[key] = updatedData[key];
      }
    })
    return {
      isUpdated : isUpdated,
      data : finalUpdatedObj
    };
  };

}
