// import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AUTHENTICATION_TOKEN, FAKE_TOKEN } from 'app/app.constants';
import { GoogleAuthService } from 'app/services/authenticate.service';
import { LocalStorageService } from 'ngx-webstorage';
// import { Observable } from 'rxjs';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// import { AccountService } from 'app/core/auth/account.service';
// import { LoginModalService } from 'app/core/login/login-modal.service';
// import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(private googleAuthService: GoogleAuthService, private $localStorageService: LocalStorageService, private router: Router) {}

  canActivate(): boolean {
    // return this.googleAuthService.getUserInfo().pipe(
    //   map((res: HttpResponse<any>) => {
    //     return res.body ? true : false;
    //   })
    // );

    /*
      FAKE LOGIN
     */
    const accessToken = this.$localStorageService.retrieve(FAKE_TOKEN) || this.$localStorageService.retrieve(AUTHENTICATION_TOKEN);
    if (accessToken) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
    // return this.checkLogin(authorities, state.url);
  }

  // checkLogin(authorities: string[], url: string): Observable<boolean> {
  //   return this.accountService.identity().pipe(
  //     map(account => {
  //       if (!authorities || authorities.length === 0) {
  //         return true;
  //       }

  //       if (account) {
  //         const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
  //         if (hasAnyAuthority) {
  //           return true;
  //         }
  //         if (isDevMode()) {
  //           console.error('User has not any of required authorities: ', authorities);
  //         }
  //         this.router.navigate(['accessdenied']);
  //         return false;
  //       }

  //       this.stateStorageService.storeUrl(url);
  //       this.router.navigate(['']);
  //       this.loginModalService.open();
  //       return false;
  //     })
  //   );
  // }
}
