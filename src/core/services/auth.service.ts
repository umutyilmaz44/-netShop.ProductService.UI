import { EventEmitter, Injectable } from '@angular/core';
import * as oidc from 'oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  config: oidc.UserManagerSettings = {
    authority: 'https://localhost:5001',
    client_id: 'AngularClient',
    redirect_uri: 'http://localhost:4200/signin-callback',
    post_logout_redirect_uri: 'http://localhost:4200',
    automaticSilentRenew: true,
    silent_redirect_uri: "http://localhost:4200/silent-callback",
    response_type: 'code',
    scope: 'ProductService.Write ProductService.Read profile openid offline_access email roles',
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new oidc.WebStorageStateStore({ store: window.localStorage })
  };

  userManager: oidc.UserManager;
  userLoadededEvent: EventEmitter<oidc.User> = new EventEmitter<oidc.User>();
  private currentUser: oidc.User | null = null;

  constructor() {
    this.userManager = new oidc.UserManager(this.config);
    this.userManager.getUser().then((user) => {
      //Kullanıcı login olduysa burası tetiklenecek.
      if (user) {
        console.log(user);
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }

      console.log(`getUser called with : `);
      console.log(user);
    });
  }

  isLoggedIn(): boolean {
    return this.currentUser != null && !this.currentUser.expired;
  }

  getClaims(): any {
    return this.currentUser?.profile;
  }

  getAuthorizationHeaderValue(): string {
    if (this.currentUser) {
      return `${this.currentUser.token_type} ${this.currentUser.access_token}`;
    } else {
      return '';
    }
  }

  getLoggedUserName(): string {
    if (this.currentUser && this.currentUser.profile.given_name) {
      return `${this.currentUser.profile.given_name} ${this.currentUser.profile.family_name}`;
    } else {
      return '';
    }
  }

  startAuthentication(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.userManager.signinRedirectCallback().then((user) => {
      this.currentUser = user;
      console.log(`login completed with : `);
      console.log(user);
    });
  }

  logout(){
    this.userManager.signoutRedirect();
  }
}
