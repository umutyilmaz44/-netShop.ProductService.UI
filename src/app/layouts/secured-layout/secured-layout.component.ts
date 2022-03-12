import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoadingService } from 'src/core/services/loading.service';

@Component({
  selector: 'app-secured-layout',
  templateUrl: './secured-layout.component.html',
  styleUrls: [
    './secured-layout.component.css'
  ]
})
export class SecuredLayoutComponent implements OnInit {

  @ViewChild('navbar') navbar!: NavbarComponent;

  constructor(
    public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  sidebarToggle() {
    console.log('Parent sidebarToggle called!');
    this.navbar.sidebarToggle();
  }
}
