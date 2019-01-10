import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountType'
})
export class AccountTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == '1'){
      return 'Pending'
    }else if(value == '2'){
      return 'Approve'
    }else{
      return 'Reject'
    }
  };

}

