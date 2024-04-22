import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ERROR_LABEL, ERROR_MESSAGE, SUCCESS_LABEL } from 'app/app.constants';
import { NotificationService } from 'app/core/notification/notification.service';
import { ConfirmationDialogService } from 'app/layouts/common-modules/confirm-dialog/confirm-dialog.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { DanhMucService } from '../danhmuc.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SlideInOutAnimation } from './animation';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ChildArticleModalComponent } from 'app/shared/popup-modal/child-article-modal/child-article-modal.component';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementFinderService } from '../html-finder.service';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'jhi-child-article',
  templateUrl: './child-article.component.html',
  styleUrls: ['./child-article.component.scss'],
  animations: [SlideInOutAnimation]
})
export class ChildArticleComponent implements OnInit, AfterViewInit, OnDestroy {
  editing = false;
  choosing = false;
  creating = false;
  step = 0;

  @ViewChild('editorRootNode') editorRootNode!: ElementRef;
  @ViewChild('filePickerEditor') filePickerEditor!: EditorComponent;
  @ViewChild('imageInput') imageInput!: HTMLInputElement;
  @ViewChild('divID') divID!: HTMLInputElement;

  tinyMceSetting: any;
  safeHtml!: SafeHtml;
  showContentHtml!: SafeHtml;
  entity: any;
  params: any;

  showContent =
    '<p style="color: red; font-size: 18px;">This is an existing paragraph with custom formatting.</p> <p style="color: red; font-size: 18px;"><strong>adsa</strong></p> <p style="color: red; font-size: 18px;">&nbsp;</p> <p style="color: red; font-size: 18px;"><strong>blue soul</strong></p>';

  sanitizedContent: any;
  hierarchicalList: any[] = [];
  searchElementList: any[] = [];

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

  MAIN_ARTICLE_URL = '/api/main-article';
  CHILD_ARTICLE_URL = '/api/child-article';
  requestForm: any;

  contentChanged$!: Observable<void>;
  private observer: MutationObserver | undefined;
  private observerCallback: Observer<void> | undefined;
  private subscription: Subscription | undefined;

  // filters
  nameFilter = '';
  codeFilter = '';
  sqlFilter = '';
  inputSamplefilter = '';
  ouputSampleFilter = '';
  connectionNameFilter = '';

  modalRef!: NgbModalRef;
  selectedFile!: File;

  constructor(
    private dmService: DanhMucService,
    private formBuilder: FormBuilder,
    private scroller: ViewportScroller,
    private confirmDialogService: ConfirmationDialogService,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private elementFinderService: ElementFinderService,
    private modalService: NgbModal
  ) {
    // eslint-disable-next-line

    this.order = 'asc';

    this.requestForm = formBuilder.group({
      code: '',
      name: '',
      strSql: '',
      inputSample: '',
      outputSample: '',
      connectionId: ''
    });

    this.entity = {
      fileName: '',
      folder: ''
    };

    this.filterCode = '';
    this.filterName = '';
  }

  ngOnInit(): void {
    this.tinyMceSetting = {
      height: 500,
      menubar: false,
      inline: true,
      // eslint-disable-next-line
      codesample_global_prismjs: true,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor image textcolor colorpicker',
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
        'undo redo | formatselect | fontsizeselect | fontselect \
        | table tabledelete | tableprops tablerowprops tablecellprops \
        | tableinsertrowbefore tableinsertrowafter tabledeleterow \
        | tableinsertcolbefore tableinsertcolafter tabledeletecol \
        | bold italic underline backcolor | image | forecolor backcolor \
        | alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | fullscreen | help'
    };

    this.loadData();

    this.activeRouter.queryParams.subscribe(params => {
      this.params = params;
      if (this.params.childarticleid) {
        this.loadChildDetails(this.params.childarticleid);
      }
    });
  }

  ngAfterViewInit(): void {
    this.contentChanged$ = new Observable<void>(observer => {
      this.observerCallback = observer;
      this.setupMutationObserver();
    });

    this.subscription = this.contentChanged$.subscribe(() => {
      this.activeRouter.queryParams.subscribe(params => {
        this.params = params;
        if (this.params.searchphase) {
          this.goDownToSearchPhase(this.params.searchphase);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.disconnectMutationObserver();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setupMutationObserver(): void {
    if (!this.observer) {
      this.observer = new MutationObserver(() => {
        if (this.observerCallback) {
          this.observerCallback.next();
        }
      });
      this.observer.observe(this.editorRootNode.nativeElement, { childList: true, subtree: true });
    }
  }

  private disconnectMutationObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.observerCallback) {
      this.observerCallback.complete();
    }
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
        this.MAIN_ARTICLE_URL
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.body) {
          if (response.body.CODE === '00') {
            this.listEntity = response.body.RESULT.content;
            this.totalItems = response.body.RESULT.totalElements;

            this.activeRouter.queryParams.subscribe(params => {
              this.params = params;
              if (this.params.mainarticleid) {
                console.log('test');
                const findMainPost = response.body.RESULT.content.findIndex(
                  (item: any) => item.id === parseInt(this.params.mainarticleid, 10)
                );
                console.log(findMainPost);
                if (findMainPost > -1) this.step = findMainPost;
              }
            });
          }
        }
      });
  }

  loadChildData(index: number): void {
    this.step = index;
    // 'mainarticle.id=="' +mainarticleid + '"'
    const mainarticleid = this.listEntity[index].id;

    this.dmService
      .query(
        {
          sort: this.sort(),
          page: 0,
          size: 10,
          filter: 'mainarticle.id>=' + mainarticleid + ';mainarticle.id<=' + mainarticleid
        },
        this.CHILD_ARTICLE_URL
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.body) {
          if (response.body.CODE === '00') {
            this.listEntity[index].childList = response.body.RESULT.content;

            this.activeRouter.queryParams.subscribe(params => {
              this.params = params;
              if (this.params.childarticleid === undefined || this.params.childarticleid === null) {
                this.processHtmlString(response.body.RESULT.content[0].content);
                this.showContent = response.body.RESULT.content[0].content;
              }
            });
          }
        }
      });
  }

  loadChildDetails(inputId: number): void {
    this.dmService.getOption({}, this.CHILD_ARTICLE_URL, '/details/' + inputId).subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        if (response.body.CODE === '00') {
          this.entity = response.body.RESULT;
          this.showContent = response.body.RESULT.content;
          this.processHtmlString(response.body.RESULT.content);
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

  openChildArticleModal(entity: any): void {
    this.modalRef = this.modalService.open(ChildArticleModalComponent, {
      windowClass: 'hsbaModalClass',
      keyboard: true,
      backdrop: 'static'
    });
    this.modalRef.componentInstance.inputId = entity ? entity.id : 0;
    this.modalRef.componentInstance.inputMainArticleId = 0;

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

  openCreateChildArticleModal(inputMainArticleId: number): void {
    this.modalRef = this.modalService.open(ChildArticleModalComponent, {
      windowClass: 'hsbaModalClass',
      keyboard: true,
      backdrop: 'static'
    });

    this.modalRef.componentInstance.inputId = 0;
    this.modalRef.componentInstance.inputMainArticleId = inputMainArticleId;

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

  onDelete(id: number): void {
    this.confirmDialogService
      .confirm('Xác nhận xóa!', 'Bạn có thật sự muốn xóa bản ghi này?', 'Đồng ý', 'Hủy')
      .then((confirmed: any) => {
        if (confirmed) this.deleteEntity(id);
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteEntity(id: number): void {
    this.dmService.delete(id, this.MAIN_ARTICLE_URL).subscribe(
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

  onDeleteChildPost(id: number): void {
    this.confirmDialogService
      .confirm('Xác nhận xóa!', 'Bạn có thật sự muốn xóa bản ghi này?', 'Đồng ý', 'Hủy')
      .then((confirmed: any) => {
        if (confirmed) this.deleteChildPostEntity(id);
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  deleteChildPostEntity(id: number): void {
    this.dmService.delete(id, this.CHILD_ARTICLE_URL).subscribe(
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

  onSelect(entity: any): void {
    this.selectedID = entity.id;
  }

  getChildSafeHtml(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }

  onFileInputChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      // Your logic when a file is selected
      this.selectedFile = file;
      console.log('Selected file:', file);
    }

    // // Optionally, reset the input value to allow selecting the same file again
    // fileInput.value = '';
  }

  setStep(index: number): void {
    this.step = index;
  }

  processHtmlString(input: string): void {
    this.hierarchicalList = [];

    const tempElement = document.createElement('div');
    tempElement.innerHTML = input;

    const headings = tempElement.querySelectorAll('h1, h2');

    let parent: HierarchicalItem | undefined;
    const stack: HierarchicalItem[] = [];

    headings.forEach((heading: any) => {
      const headingLevel = parseInt(heading.tagName.charAt(1), 10);

      const item: HierarchicalItem = {
        level: headingLevel,
        heading: heading.innerText
      };

      while (stack.length > 0 && stack[stack.length - 1].level >= headingLevel) {
        stack.pop();
      }

      if (stack.length > 0) {
        parent = stack[stack.length - 1];
        parent.children = parent.children || [];
        parent.children.push(item);
      } else {
        this.hierarchicalList.push(item);
      }

      if (headingLevel < 5) {
        stack.push(item);
      }
    });
  }

  goDownToElement(lever: number, heading: string): void {
    const aTags = document.getElementsByTagName('h' + lever);
    const searchText = heading;
    let found;

    for (let i = 0; i < aTags.length; i++) {
      if ((aTags[i].textContent ?? '').includes(searchText)) {
        found = aTags[i];
        break;
      }
    }

    (found as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }

  childGoDownToElement($event: { level: string; heading: string }): void {
    console.log('abc', $event);
    this.goDownToElement(parseInt($event.level, 10), $event.heading);
  }

  goToPage(mainarticleid: number, childarticleid: number): void {
    this.searchElementList = [];
    this.router.navigate(['/danhmuc/child-article'], {
      queryParams: { mainarticleid, childarticleid, searchphase: '' },
      queryParamsHandling: 'merge'
    });
  }

  goDownToSearchPhase(searchPhase: string): void {
    console.log('abcd: ', searchPhase);
    this.searchElementList = [];
    this.searchElementList = this.elementFinderService.findElementByContent(this.editorRootNode, searchPhase);

    // if (element) {
    //   element.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start',
    //     inline: 'nearest'
    //   });
    // }
  }

  setArticleName($event: any): void {
    this.router.navigate(['/danhmuc/child-article'], {
      queryParams: { mainarticleid: $event.article.mainarticle.id, childarticleid: $event.article.id, searchphase: $event.searchPhase },
      queryParamsHandling: 'merge'
    });
  }

  goDownToSearchElement(htmlElement: HTMLElement): void {
    htmlElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  }
}

interface HierarchicalItem {
  level: number;
  heading: string;
  content?: string;
  children?: HierarchicalItem[];
}
