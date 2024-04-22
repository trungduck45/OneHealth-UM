import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';
declare let tinymce: any;

@Component({
  selector: 'jhi-child-article-modal',
  templateUrl: './child-article-modal.component.html',
  styleUrls: ['./child-article-modal.component.scss']
})
export class ChildArticleModalComponent implements OnInit, OnChanges {
  @Input() inputId!: any;
  @Input() inputMainArticleId!: any;

  editing = false;
  editorContent = '';

  entity: any;
  outputSample: any;
  listMainArticle: any;

  REQUEST_URL = '/api/child-article';
  MAINARTICLE_REQUEST_URL = '/api/main-article';
  connections: any[] = [];
  connectionStatus: number;
  tinyMceSetting: any;

  constructor(public activeModal: NgbActiveModal, private dmService: DanhMucService, private notificationService: NotificationService) {
    this.entity = {
      id: 0,
      note: '',
      code: '',
      content: '',
      mainarticleid: 0,
      mainarticle: { id: 0 },
      createDate: '',
      updateDate: ''
    };
    this.connectionStatus = -1;
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    tinymce.init({
      selector: '#myTextarea'
      // Add your TinyMCE configuration options here
    });
    // tinymce.activeEditor.setMode('readonly');
    this.tinyMceSetting = {
      height: 500,
      menubar: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor image',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount table codesample'
      ],
      // eslint-disable-next-line
      font_formats:
        'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; \
        Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; \
        Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; \
        Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; \
        Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; \
        Terminal=terminal,monaco; Times New Roman=times new roman,times; \
        Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; \
        Wingdings=wingdings,zapf dingbats',
      toolbar:
        'undo redo | formatselect | fontsizeselect | fontselect | codesample \
        | bold italic underline backcolor | image  \
        | alignleft aligncenter alignright alignjustify | \
        | table tabledelete | tableprops tablerowprops tablecellprops \
        | tableinsertrowbefore tableinsertrowafter tabledeleterow \
        | tableinsertcolbefore tableinsertcolafter tabledeletecol \
        bullist numlist outdent indent | removeformat | fullscreen | help',
      // eslint-disable-next-line
      image_title: true,
      // eslint-disable-next-line
      automatic_uploads: true,
      // eslint-disable-next-line
      file_picker_types: 'image',
      // eslint-disable-next-line
      file_picker_callback(cb: any, value: any, meta: any): void {
        console.log('abc');
        // eslint-disable-next-line

        const element: HTMLInputElement | null = document.querySelector('input[type="file"]');

        if (element) {
          const fileSelectedPromise = new Promise<File | null>(resolve => {
            element.onchange = () => {
              const file = element.files?.[0];
              resolve(file ?? null);
            };
          });

          // Trigger the click event
          element.click();

          // Wait for the promise to resolve
          fileSelectedPromise.then(file => {
            if (file) {
              // Handle the selected file, for example, log its details
              const reader = new FileReader();
              reader.onload = () => {
                const id = 'blobid' + new Date().getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                if (reader.result !== null) {
                  const base64 = (reader.result as string).split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                }
              };
              reader.readAsDataURL(file);

              // You can perform additional logic or trigger further actions with the file here
            } else {
              console.log('No file selected');
            }
          });
        }
      },
      // eslint-disable-next-line
      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    };

    this.loadDataMainArticle();

    if (this.inputMainArticleId > 0) {
      this.entity.mainarticle.id = this.inputMainArticleId;
    }

    if (this.inputId === 0) {
      this.editing = true;
    } else {
      this.loadDetails();
    }
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

    this.entity.content = this.editorContent;

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
          this.editorContent = response.body.RESULT.content;
        }
      }
    });
  }

  loadDataMainArticle(): void {
    this.dmService.getOption({}, this.MAINARTICLE_REQUEST_URL, '/all').subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        if (response.body.CODE === '00') {
          this.listMainArticle = response.body.RESULT;
        }
      }
    });
  }
}
