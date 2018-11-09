import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppToastrService {

  constructor(private toastr: ToastrService) { }

  success(msg, heading?) {
      return this.toastr.success(msg, heading, {progressBar : true});
  }

  error(msg, heading?){
      return this.toastr.error(msg, heading, {progressBar : true});
  }

  warning(msg, heading?){
      return this.toastr.warning(msg, heading, {progressBar : true});
  }

  info(msg, heading?){
      return this.toastr.info(msg, heading, {progressBar : true});
  }

  show(msg, heading?){
      return this.toastr.show(msg, heading, {progressBar : true});
  }

}
