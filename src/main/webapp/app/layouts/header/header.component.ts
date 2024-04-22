import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/core/login/login.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'jhi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username!: string;
  fullName!: string;
  constructor(private localStorage: LocalStorageService, private loginService: LoginService) {}

  ngOnInit(): void {
    setTimeout(() => {
      const user = this.localStorage.retrieve('user');
      this.username = user === undefined || user === null ? 'admin' : user.username;
      this.fullName = user === undefined || user === null ? 'Quản trị hệ thống' : user.name;
    }, 500);
  }

  logout(): void {
    this.loginService.logout();
  }

  script(): void {
    $('#sidebar').toggleClass('block');
    $('#wrapper').toggleClass('extend');
  }
}
