import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';

@Component({
  selector: 'jhi-truyvan-modal',
  templateUrl: './truyvan-modal.component.html',
  styleUrls: ['./truyvan-modal.component.scss']
})
export class TruyvanModalComponent implements OnInit, OnChanges {
  @Input() query!: any;
  editing = false;

  outputSample: any;

  REQUEST_URL = '/api/v1.0/api/test/cashier';
  CONNECTION_REQUEST_URL = '/connection';
  connections: any[] = [];

  constructor(public activeModal: NgbActiveModal, private dmService: DanhMucService, private notificationService: NotificationService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.query) {
      console.log(changes.query.currentValue);
    }
  }

  ngOnInit(): void {
    if (this.query.id === '') {
      this.editing = true;
    }
    this.loadDanhSachConnection();
    this.outputSample = this.query.outputSample;
  }

  saveQuery(): void {
    console.log(this.query);

    if (!this.query.connection.id) {
      this.notificationService.showInfo('Vui lòng chọn kết nối', 'warning');
      return;
    }
    if (!this.query.id) this.createQuery();
    else this.updateQuery();
  }

  updateQuery(): void {
    this.dmService.update(this.query, this.REQUEST_URL).subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.code === 0) {
            this.notificationService.showSuccess(res.body.message, SUCCESS_LABEL);
          } else {
            this.notificationService.showError(res.body.message, ERROR_LABEL);
          }
        }
      },
      () => {
        this.notificationService.showError(ERROR_MESSAGE, ERROR_LABEL);
      }
    );
  }

  createQuery(): void {
    delete this.query['id'];
    this.dmService.create(this.query, this.REQUEST_URL).subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.code === 0) {
            this.notificationService.showSuccess(res.body.message, SUCCESS_LABEL);
          } else {
            this.notificationService.showError(res.body.message, ERROR_LABEL);
          }
        }
      },
      () => {
        this.notificationService.showError(ERROR_MESSAGE, ERROR_LABEL);
      }
    );
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  loadDanhSachConnection(): void {
    this.dmService
      .query(
        {
          sort: ['id,desc'],
          page: 0,
          size: 100,
          filter: 'code=="*"'
        },
        this.CONNECTION_REQUEST_URL
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.body) {
          if (response.body.code === 0) {
            this.connections = response.body.result.content;
          }
        }
      });
  }
}
