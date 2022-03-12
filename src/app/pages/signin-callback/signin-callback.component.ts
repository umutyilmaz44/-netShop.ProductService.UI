import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { LoadingService } from 'src/core/services/loading.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.component.html',
  styleUrls: ['./signin-callback.component.css']
})
export class SigninCallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    public loadingService: LoadingService) {
      this.loadingService.showLoader();
    }

  ngOnInit(): void {
    this.authService
      .completeAuthentication()
      .finally(() =>
        this.loadingService.hideLoader()
      );;
    this.router.navigate(['/dashboard']);
  }
}
