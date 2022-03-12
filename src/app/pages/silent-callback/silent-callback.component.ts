import { Component, OnInit } from '@angular/core';
import * as oidc from 'oidc-client';
import { LoadingService } from 'src/core/services/loading.service';

@Component({
  selector: 'app-silent-callback',
  templateUrl: './silent-callback.component.html',
  styleUrls: ['./silent-callback.component.css']
})
export class SilentCallbackComponent implements OnInit {

  constructor(public loadingService: LoadingService) {
    this.loadingService.showLoader();
  }

  config: oidc.UserManagerSettings = {
    authority: "https://localhost:1000",
    client_id: "AngularClient",
    response_type: "code",
    scope: "ProductService.Write ProductService.Read profile openid email roles",
  }

  ngOnInit(): void {
    new oidc.UserManager(this.config)
      .signinSilentCallback()
      .catch(error => console.log(error))
      .finally(() =>
        this.loadingService.hideLoader()
      );

  }

}
