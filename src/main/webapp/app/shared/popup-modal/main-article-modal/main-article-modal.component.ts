import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';

@Component({
  selector: 'jhi-main-article-modal',
  templateUrl: './main-article-modal.component.html',
  styleUrls: ['./main-article-modal.component.scss']
})
export class MainArticleModalComponent implements OnInit, OnChanges {
  @Input() inputId!: any;
  editing = false;

  entity: any;
  outputSample: any;

  REQUEST_URL = '/api/main-article';
  connections: any[] = [];
  connectionStatus: number;

  constructor(public activeModal: NgbActiveModal, private dmService: DanhMucService, private notificationService: NotificationService) {
    this.entity = {
      id: 0,
      note: '',
      code: '',
      createDate: '',
      updateDate: ''
    };
    this.connectionStatus = -1;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    if (this.inputId === 0) {
      this.editing = true;
      return;
    }
    this.loadDetails();
  }

  onEdit(): void {
    this.editing = true;
  }

  saveEntity(): void {
    this.updateEntity();
  }

  updateEntity(): void {
    if (this.entity.createDate === '') {
      this.entity.createDate = new Date().toISOString();
    }
    this.entity.updateDate = new Date().toISOString();

    this.dmService.postOption(this.entity, this.REQUEST_URL, '/save').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.CODE === '00') {
            this.notificationService.showSuccess(res.body.MESSAGE, SUCCESS_LABEL);
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

  testConnection(): void {
    this.dmService.getOption(null, this.REQUEST_URL, '/checkconnect/' + this.inputId).subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.CODE === '00') {
            this.notificationService.showSuccess(res.body.MESSAGE, SUCCESS_LABEL);
            this.connectionStatus = 0;
          } else {
            this.notificationService.showError(res.body.MESSAGE, ERROR_LABEL);
            this.connectionStatus = -1;
          }
        }
      },
      () => {
        this.notificationService.showError(ERROR_MESSAGE, ERROR_LABEL);
        this.connectionStatus = -1;
      }
    );
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  loadDetails(): void {
    this.dmService.getOption({}, this.REQUEST_URL, '/details/' + this.inputId).subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        if (response.body.CODE === '00') {
          this.entity = response.body.RESULT;
        }
      }
    });
  }
}
