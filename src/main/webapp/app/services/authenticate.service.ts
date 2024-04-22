import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ACCESS_TOKEN, GOOGLE_API_TOKEN, OPERATIONS, SERVER_API_URL } from 'app/app.constants';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

/**
 * biến này được định nghĩa sẵn trong thư viện "https://apis.google.com/js/client:platform.js?onload=start"
 * import ở file index.html
 */
declare const auth2: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  constructor(
    protected http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  fetchGoogleUser(): void {
    auth2.grantOfflineAccess().then((authResult: any) => {
      if (authResult['code']) {
        console.log(JSON.stringify(authResult));
        this.getAccessToken(authResult['code']).subscribe((res: HttpResponse<any>) => {
          if (res.body.code === 0) {
            this.saveToken(res.body.result);
            this.router.navigate(['/home']);
          }
        });
      } else {
        // There was an error.
      }
    });
  }

  getAccessToken(oneTimeCode: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(SERVER_API_URL + '/google/getToken' + '?code=' + oneTimeCode, null, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      observe: 'response'
    });
  }

  private saveToken(token: any): void {
    this.$localStorage.store(ACCESS_TOKEN, token['id_token']);
    this.$localStorage.store(GOOGLE_API_TOKEN, token);
    this.$sessionStorage.store(ACCESS_TOKEN, token['id_token']);
    this.$sessionStorage.store(GOOGLE_API_TOKEN, token);
  }

  getUserInfo(): Observable<HttpResponse<any>> {
    return this.http.get<any>(SERVER_API_URL + OPERATIONS.GET_USER_INFO, { observe: 'response' });
  }
}
