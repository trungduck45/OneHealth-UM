import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { ConfirmationDialogService } from 'app/layouts/common-modules/confirm-dialog/confirm-dialog.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { MainArticleModalComponent } from 'app/shared/popup-modal/main-article-modal/main-article-modal.component';
import { DanhMucService } from '../danhmuc.service';

@Component({
  selector: 'jhi-main-article',
  templateUrl: './main-article.component.html',
  styleUrls: ['./main-article.component.scss']
})
export class MainArticleComponent implements OnInit {
  editing = false;
  choosing = false;
  creating = false;

  maIsEmpty = false;
  connectionIsEmpty = false;

  listEntity!: any[];
  itemsPerPage = ITEMS_PER_PAGE;
  page = 1;
  previousPage!: number;
  predicate = 'id'; // sort field
  totalItems = 0;
  order: 'asc' | 'desc';
  selectedID = -1;

  filterCode: String;
  filterName: String;

  REQUEST_URL = '/api/main-article';
  requestForm: any;

  // filters
  nameFilter = '';
  codeFilter = '';
  sqlFilter = '';
  inputSamplefilter = '';
  ouputSampleFilter = '';
  connectionNameFilter = '';

  modalRef!: NgbModalRef;

  constructor(
    private dmService: DanhMucService,
    private formBuilder: FormBuilder,
    private confirmDialogService: ConfirmationDialogService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    this.order = 'asc';

    this.requestForm = formBuilder.group({
      code: '',
      name: '',
      strSql: '',
      inputSample: '',
      outputSample: '',
      connectionId: ''
    });

    this.filterCode = '';
    this.filterName = '';
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dmService
      .query(
        {
          sort: this.sort(),
          page: this.page - 1,
          size: this.itemsPerPage,
          filter: this.filter()
        },
        this.REQUEST_URL
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.body) {
          if (response.body.CODE === '00') {
            this.listEntity = response.body.RESULT.content;
            this.totalItems = response.body.RESULT.totalElements;
          }
        }
      });
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + this.order];
    return result;
  }

  private filter(): string {
    const comparesArray: string[] = [];

    const { filterCode, filterName } = this;

    if (filterName) comparesArray.push(`name==*${filterName}*`);
    if (filterCode) comparesArray.push(`code==*${filterCode}*`);
    return comparesArray.length > 0 ? comparesArray.join(';') : 'code=="*"';
  }

  onDelete(id: number): void {
    this.confirmDialogService
      .confirm('Xác nhận xóa!', 'Bạn có thật sự muốn xóa bản ghi này?', 'Đồng ý', 'Hủy')
      .then((confirmed: any) => {
        if (confirmed) this.deleteEntity(id);
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteEntity(id: number): void {
    this.dmService.delete(id, this.REQUEST_URL).subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.CODE === '00') {
            this.notificationService.showSuccess(res.body.MESSAGE, SUCCESS_LABEL);
            this.loadData();
          } else {
            this.notificationService.showError(res.body.MESSAGE, ERROR_LABEL);
          }
        }
      },
      () => {
        this.notificationService.showError(ERROR_MESSAGE, ERROR_LABEL);
      }
    );
  }

  openModal(entity: any): void {
    this.modalRef = this.modalService.open(MainArticleModalComponent, {
      windowClass: 'hsbaModalClass',
      keyboard: true,
      backdrop: 'static'
    });
    this.modalRef.componentInstance.inputId = entity ? entity.id : 0;

    this.modalRef.result.then(
      () => {
        // on modal success
        console.log('modal success!');
        this.loadData();
      },
      () => {
        // on modal dismiss
        console.log('modal dismiss');
        this.loadData();
      }
    );
  }

  onSelect(entity: any): void {
    this.selectedID = entity.id;
  }
}
