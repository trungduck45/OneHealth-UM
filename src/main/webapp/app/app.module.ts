import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { DreportSharedModule } from 'app/shared/shared.module';
import { DreportCoreModule } from 'app/core/core.module';
import { DreportAppRoutingModule } from './app-routing.module';
import { DreportEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { ConfirmDialogComponent } from './layouts/common-modules/confirm-dialog/confirm-dialog.component';
import { Overlay, OverlayContainer, ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    BrowserModule,
    DreportSharedModule,
    DreportCoreModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    DreportEntityModule,
    DreportAppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      timeOut: 5000,
      extendedTimeOut: 1000,
      closeButton: true
    })
  ],
  providers: [ToastrService, Overlay, OverlayContainer],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    DashboardComponent,
    LoginPageComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [MainComponent]
})
export class DreportAppModule {}
