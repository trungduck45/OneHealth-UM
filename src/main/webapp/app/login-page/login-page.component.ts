import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
// import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
// import { NotificationService } from 'app/core/notification/notification.service';
import { AuthServerProvider } from 'app/core/auth/auth-jwt.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';
import { GoogleAuthService } from 'app/services/authenticate.service';
import { LocalStorageService } from 'ngx-webstorage';
// import { HttpResponse } from '@angular/common/http';
// import { AccountService } from 'app/core/auth/account.service';

declare const gapi: any;

@Component({
  selector: 'jhi-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  // const url redirect
  URL_REDIRECT = 'https://dangnhap.vnpt.vn/oauth2/authorize?response_type=code';
  CLIENT_ID = 'AhnCNky7Stf_ddWfxvN68BYhVCwa';
  REDIRECR_URI = 'https://test-emr.vncare.vn/sso';
  // REDIRECR_URI = 'localhost:9000/sso';
  URL_USER = '/api/user';

  loginForm: any;
  message?: string;
  enableSSO: any;
  url_current = window.location.origin;
  apiSSO!: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private googleAuthService: GoogleAuthService,
    // private notificateService: NotificationService,
    private $localStorage: LocalStorageService,
    private dmService: DanhMucService,
    private authService: AuthServerProvider // private sessionStorage: SessionStorageService,
  ) {
    this.enableSSO = false;
    this.loginForm = fb.group({
      username: '',
      password: '',
      rememberMe: false
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.focus();
    }, 200);
    this.script();
    this.apiSSO = `${this.URL_REDIRECT}&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECR_URI}&scope=openid`;
  }

  focus(): void {
    $('#username').focus();
    $('input').focus(function(): void {
      $(this).select();
    });

    // toggle password
    $('.toggle-password').click(function(): void {
      $(this).toggleClass('fa-eye fa-eye-slash');
      const input = $($(this).attr('toggle')!);
      if (input.attr('type') === 'password') {
        input.prop('type', 'text');
        // input.attr("type", "text");
      } else {
        // input.attr("type", "password");
        input.prop('type', 'password');
      }
    });
  }
  onSubmit(): void {
    this.authService
      .loginN({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value
      })
      .subscribe((response: HttpResponse<any>) => {
        const accountInfo = response.body;
        this.authService.authenticateSuccess(accountInfo);
        this.getUserInfo();
        this.router.navigate(['/home']);
      });
  }

  getUserInfo(): void {
    this.dmService.getOption({}, this.URL_USER, '/info').subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        this.$localStorage.store('user', response.body.RESULT.content);
      }
    });
  }

  script(): void {
    $(window).resize(function(): void {
      $('#login-inner .row').height($(window).height()! - 146);
    });
    $(window).trigger('resize');
  }

  loginWithGoogle(): void {
    this.googleAuthService.fetchGoogleUser();
  }
}
