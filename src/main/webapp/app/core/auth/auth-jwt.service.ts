import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { SERVER_API_URL } from 'app/app.constants';
import { Login } from 'app/core/login/login.model';
import { Router } from '@angular/router';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(SERVER_API_URL + 'api/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response)));
  }

  loginN(credentials: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(SERVER_API_URL + '/public/login', credentials, { observe: 'response' });
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear();
      this.$sessionStorage.clear();
      this.router.navigate(['/login']);
      observer.complete();
    });
  }

  public authenticateSuccess(response: any): void {
    this.$localStorage.store('authenticationToken', response.accessToken);
  }
}
