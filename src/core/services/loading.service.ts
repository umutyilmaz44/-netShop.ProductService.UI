import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isActive = false;

  constructor() { }

  showLoader(){
    this.isActive = true;
  }

  hideLoader(){
    this.isActive = false;
  }
}
