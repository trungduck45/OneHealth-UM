import { NgModule } from '@angular/core';
import { DreportSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { CrudButtonsComponent } from 'app/layouts/common-modules/crud-buttons/crud-buttons.component';
import { jqxTreeGridModule, jqxTreeGridComponent } from 'jqwidgets-ng/jqxtreegrid';
import { SelectTreeGridComponent } from './common/select-tree-grid/select-tree-grid.component';
import { jqxDropDownButtonComponent, jqxDropDownButtonModule } from 'jqwidgets-ng/jqxdropdownbutton';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { SelectSearchComponent } from './common/select-search/select-search.component';

@NgModule({
  imports: [DreportSharedLibsModule, jqxTreeGridModule, jqxDropDownButtonModule, NgSelectModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    CrudButtonsComponent,
    SelectTreeGridComponent,
    SelectSearchComponent
  ],
  entryComponents: [LoginModalComponent],
  exports: [
    DreportSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    CrudButtonsComponent,
    jqxTreeGridComponent,
    jqxDropDownButtonComponent,
    SelectTreeGridComponent,
    SelectSearchComponent,
    NgSelectComponent
  ]
})
export class DreportSharedModule {}
