import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations: [trigger('openClose', [
    state('*', style({ opacity: 1 })),
    state('void', style({ opacity: 0 })),
    transition('void => *', animate('0.25s ease-in-out')),
  ])]
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
