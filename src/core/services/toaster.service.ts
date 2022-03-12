import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  config = {
    positionClass: 'toast-top-right',
    progressBar: true,
    closeButton: true,
    enableHtml: true,
    toastClass: ''
  }

  constructor(private toastr: ToastrService) { }

  info(message?: string, title?: string){
    message = '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message;
    this.config.toastClass = 'alert alert-info alert-with-icon';
    this.toastr.info(message, title, this.config);
  }
  success(message?: string, title?: string){
    message = '<span class="tim-icons icon-check-2" [data-notify]="icon"></span> ' + message;
    this.config.toastClass = 'alert alert-success alert-with-icon';
    this.toastr.success(message, title, this.config);
  }
  error(message?: string, title?: string){
    message = '<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> ' + message;
    this.config.toastClass = 'alert alert-danger alert-with-icon';
    this.toastr.error(message, title, this.config);
  }
  warning(message?: string, title?: string){
    message = '<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> ' + message;
    this.config.toastClass = 'alert alert-warning alert-with-icon';
    this.toastr.warning(message, title, this.config);
  }
  show(message?: string, title?: string){
    message = '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message;
    this.config.toastClass = 'alert alert-primary alert-with-icon';
    this.toastr.show(message, title, this.config);
  }
}
