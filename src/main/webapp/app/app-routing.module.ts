import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { UserRouteAccessService } from './core/auth/user-route-access-service';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'login',
          component: LoginPageComponent
        },
        {
          path: '',
          component: HomeComponent,
          canActivate: [UserRouteAccessService],
          data: {
            authorities: [],
            pageTitle: 'VNPT Payment'
          },
          children: [
            {
              path: 'home',
              component: DashboardComponent
            },
            {
              path: 'danhmuc',
              loadChildren: () => import('./entities/danhmuc/danhmuc.module').then(m => m.DanhMucModule)
            }
          ]
        }
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class DreportAppRoutingModule {}
