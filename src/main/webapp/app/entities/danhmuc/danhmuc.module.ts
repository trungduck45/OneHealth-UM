import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DreportSharedModule } from 'app/shared/shared.module';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { MatExpansionModule } from '@angular/material/expansion';
import { TruyvanModalComponent } from 'app/shared/popup-modal/truyvan-modal/truyvan-modal.component';
import { PosprofileModalComponent } from 'app/shared/popup-modal/posprofile-modal/posprofile-modal.component';
import { PosterminalModalComponent } from 'app/shared/popup-modal/posterminal-modal/posterminal-modal.component';
import { CashierModalComponent } from 'app/shared/popup-modal/cashier-modal/cashier-modal.component';
import { SaleModalComponent } from 'app/shared/popup-modal/sale-modal/sale-modal.component';
import { UserComponent } from './user/user.component';
import { UserModalComponent } from 'app/shared/popup-modal/user-modal/user-modal.component';
import { BackupLogComponent } from './backuplog/backuplog.component';
import { BackupLogModalComponent } from 'app/shared/popup-modal/backuplog-modal/backuplog-modal.component';
import { CloudSettingComponent } from './cloudsetting/cloudsetting.component';
import { CloudSettingModalComponent } from 'app/shared/popup-modal/cloudsetting-modal/cloudsetting-modal.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainArticleComponent } from './main-article/main-article.component';
import { MainArticleModalComponent } from 'app/shared/popup-modal/main-article-modal/main-article-modal.component';
import { ChildArticleModalComponent } from 'app/shared/popup-modal/child-article-modal/child-article-modal.component';
import { TreeContentComponent } from 'app/shared/common/tree-content/tree-content.component';
import { ChildArticleComponent } from './child-article/child-article.component';
import { ArticleAutocompleteComponent } from 'app/shared/multiselect/post-multiselect-autocomplete/multiselect-autocomplete.component';

@NgModule({
  imports: [
    DreportSharedModule,
    MonacoEditorModule,
    MatExpansionModule,
    NgbModule,
    EditorModule,
    RouterModule.forChild([
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'cloudsetting',
        component: CloudSettingComponent
      },
      {
        path: 'backuplog',
        component: BackupLogComponent
      },
      {
        path: 'main-article',
        component: MainArticleComponent
      },
      {
        path: 'child-article',
        component: ChildArticleComponent
      }
    ])
  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'content/js/monaco-editor/min/vs'
    }
  ],
  declarations: [
    TruyvanModalComponent,
    PosprofileModalComponent,
    PosterminalModalComponent,
    CashierModalComponent,
    SaleModalComponent,
    BackupLogComponent,
    BackupLogModalComponent,
    MainArticleComponent,
    MainArticleModalComponent,
    ChildArticleModalComponent,
    CloudSettingComponent,
    CloudSettingModalComponent,
    UserComponent,
    ChildArticleComponent,
    UserModalComponent,
    TreeContentComponent,
    ArticleAutocompleteComponent
  ],
  entryComponents: [TruyvanModalComponent]
})
export class DanhMucModule {}
