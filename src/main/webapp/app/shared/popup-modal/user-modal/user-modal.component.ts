import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';

@Component({
  selector: 'jhi-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit, OnChanges {
  @Input() inputId!: any;
  editing = false;

  entity: any;
  outputSample: any;

  REQUEST_URL = '/api/user';
  listPosterminal: any[] = [];
  connectionStatus: number;

  constructor(public activeModal: NgbActiveModal, private dmService: DanhMucService, private notificationService: NotificationService) {
    this.entity = {
      id: 0,
      username: '',
      name: '',
      password: '',
      unit: '',
      phone: '',
      email: '',
      note: ''
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

  dismiss(): void {
    this.activeModal.dismiss();
  }

  loadDetails(): void {
    this.dmService.getOption({}, this.REQUEST_URL, '/details/' + this.inputId).subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        if (response.body.CODE === '00') {
          this.entity = response.body.RESULT.content;
        }
      }
    });
  }
}
