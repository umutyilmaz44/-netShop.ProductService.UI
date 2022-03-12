import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class ModalAlertService {

  constructor() { }

  simpleAlert() {
    Swal.fire('Hello Angular');
  }

  alertWithSuccess() {
    Swal.fire('Başarılı', 'İşleminiz Başarıyla Tamamlandı', 'success')
  }

  errorAlert(title: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: 'Bir Hata oluştu!',
      footer: '<a href>Why do I have this issue?</a>'
    })
  }

  topend(title: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  confirmBox(title: string, subtitle: string, yesfunc:any, nofunc:any) {
    Swal.fire({
      title: title,
      text: subtitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result:any) => {
      if (result.value) {
        if(yesfunc) {
          yesfunc();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if(nofunc) {
          nofunc();
        }
      }
    })
  }

  confirmBoxWithHtml(title: string, subtitle: string, yesfunc: any, nofunc: any) {
    Swal.fire({
      title: title,
      html: subtitle,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result: any) => {
      if (result.value) {
        if(yesfunc) {
          yesfunc();
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        if(nofunc) {
          nofunc();
        }
      }
    })
  }
}
