import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';

@Component({
  selector: 'jhi-sale-modal',
  templateUrl: './sale-modal.component.html',
  styleUrls: ['./sale-modal.component.scss']
})
export class SaleModalComponent implements OnInit, OnChanges {
  @Input() inputId!: any;
  editing = false;

  entity: any;
  outputSample: any;

  REQUEST_URL = '/api/v1.0/public/test/payment';
  LOG_URL = '/basicauth/pos/trans-notify';
  listPosprofile: any[] = [];
  connectionStatus: number;

  isDisabled = false;

  constructor(public activeModal: NgbActiveModal, private dmService: DanhMucService, private notificationService: NotificationService) {
    this.entity = {
      posterminalid: 0,
      amount: 0,
      checksum: '',
      description: '',
      hisUser: 'pmm_test',
      orderId: '',
      uuid: '123456',
      f1: '',
      f2: '',
      f3: '',
      f4: '',
      f5: '',
      message: '',
      result: ''
    };
    this.connectionStatus = -1;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.entity.posterminalid = this.inputId;
  }

  saveEntity(): void {
    this.updateEntity();
  }

  updateEntity(): void {
    this.entity.orderId = new Date().getTime();
    this.dmService.postOption(this.entity, this.REQUEST_URL, '/sale').subscribe(
      (res: HttpResponse<any>) => {
        if (res.body) {
          if (res.body.CODE === '00') {
            this.entity.message = res.body.MESSAGE;
            this.entity.result = res.body.RESULT;
            this.isDisabled = true;
            this.notificationService.showSuccess(res.body.MESSAGE, SUCCESS_LABEL);
          } else {
            this.entity.message = res.body.MESSAGE;
            this.entity.result = JSON.stringify(res.body.RESULT);
            this.notificationService.showError(res.body.MESSAGE, ERROR_LABEL);
          }
        }
      },
      () => {
        this.notificationService.showError(ERROR_MESSAGE, ERROR_LABEL);
      }
    );
  }
  writeLog(): void {
    const logEntity = {
      // ma_don_vi: '01009-HIS_DATA_BDHCM-965-6100-123149',
      // donvi_thanhtoan: 'LienVietPostBank',
      // so_hoa_don: 'LPB-pos-1999',
      // thoi_gian_gd: '20210912142556',
      // so_tien: '200000',
      // trang_thai: 'Success',
      // mo_ta: null
    };
    this.dmService.postOptionPayment(logEntity, this.LOG_URL, '').subscribe(
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
}
