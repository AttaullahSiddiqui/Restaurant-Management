import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { UtilityService } from './utility.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate, CanLoad {

  constructor(
    private http: HttpService,
    private router: Router,
    private utility: UtilityService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    console.log("Call : ",route);
    const token = this.utility.getToken();
    if(token){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  };

  canLoad(route: Route) : boolean{
    debugger;
    console.log("Call can load : ",route);
    //this.router.navigate(['/signup'])
    return true;
  };

};



  // if (route.data['authRequired']) {
    //     return true;
      //  return new Observable(observer => {
      //      var methodName = "?FormId=" + route.data['formId'];
      //      this._userService.get('api/Security/CanView' + methodName).subscribe(users => {
      //          if (users) {
      //              console.log("canview: true");
      //              return observer.next(true);
      //          }
      //          console.log("canview: false");
      //          this.router.navigate(['/Security']);
      //          return observer.next(false);
      //      }, err => {
      //          console.log("canview: false");
      //          this.router.navigate(['/Security']);
      //          return observer.next(false);
      //      })
      //  })
    //};