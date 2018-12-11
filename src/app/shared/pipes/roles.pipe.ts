import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roles'
})
export class RolesPipe implements PipeTransform {
  USER_ROLES = [{
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
  }]

  transform(value: any, args?: any): any {
    return this.USER_ROLES[value-1].name;;
  }

}
