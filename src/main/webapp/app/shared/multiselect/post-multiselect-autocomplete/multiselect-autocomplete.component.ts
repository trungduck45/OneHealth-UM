import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'app/core/notification/notification.service';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';
import { ElementFinderService } from 'app/entities/danhmuc/html-finder.service';
import { ConfirmationDialogService } from 'app/layouts/common-modules/confirm-dialog/confirm-dialog.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { of, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'jhi-article-autocomplete',
  templateUrl: './multiselect-autocomplete.component.html',
  styleUrls: ['./multiselect-autocomplete.component.scss']
})
export class ArticleAutocompleteComponent implements OnInit, OnDestroy {
  tourishPlanCtrl = new FormControl('');
  editorRootNode!: ElementRef;

  @ViewChild('articleSearchInput') articleSearchInput!: ElementRef;

  @ViewChild('articleSearchInput')
  tourishPlanInput!: ElementRef<HTMLInputElement>;

  @Output() setArticleEvent = new EventEmitter<{ article: any, searchPhase: string }>();

  CHILD_ARTICLE_URL = '/api/child-article';
  showSearches = false;
  isSearching = false;
  isSearchEmpty = true;
  searchedArticles: any = [];
  searchPhase = '';

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

  articles: any;
  filteredArticlePhase!: Observable<string | null>;
  subscriptions: Subscription[] = [];

  constructor(
    private dmService: DanhMucService,
    private elementFinderService: ElementFinderService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private confirmDialogService: ConfirmationDialogService,
    private notificationService: NotificationService,
    private modalService: NgbModal
  ) {
    this.order = 'asc';
    this.filterCode = '';
    this.filterName = '';

    this.filteredArticlePhase = this.tourishPlanCtrl.valueChanges;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    const search$ = this.filteredArticlePhase.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.isSearching = true)),
      switchMap(term => {
        if (term) {
          this.isSearchEmpty = false;
          return this.getArticles(term);
        } else {
          this.isSearchEmpty = true;
          return of<any>(this.articles);
        }
      }),
      tap(() => {
        (this.isSearching = false), (this.showSearches = true);
      })
    );

    this.subscriptions.push(
      search$.subscribe(data => {
        this.isSearching = false;
        this.searchedArticles = data;
      })
    );

    this.loadData('', 0, this.itemsPerPage);
  }

  getArticles(input: string): Observable<any> {
    this.loadData(input, 0, this.itemsPerPage);
    return of(this.articles);
  }

  setArticleName(article: any): void {
    this.loadData(this.searchPhase, 0, this.itemsPerPage);
    this.setArticleEvent.emit({ article, searchPhase: this.searchPhase });
    this.articleSearchInput.nativeElement.value = article.name;
    this.showSearches = false;
  }

  trackById(index: any, item: any): void {
    return item.id;
  }

  loadData(input: string, page: number, pageSize: number): void {
    const searchReq = {
      sort: this.sort(),
      page,
      size: pageSize,
      filter: input
    };
    
    //console.log('abc: ', searchReq);

    this.dmService.getOption(searchReq, this.CHILD_ARTICLE_URL, '/search-by-contain').subscribe((response: HttpResponse<any>) => {
      if (response.body) {
        if (response.body.CODE === '00') {
          this.listEntity = response.body.RESULT.content;
          this.totalItems = response.body.RESULT.totalElements;

          // this.goDownToSearchPhase(this.searchPhase, response.body.RESULT.content[0].content);

          this.searchedArticles = response.body.RESULT.content;
        }
      }
    });
  }

  private sort(): string[] {
    const result = [this.predicate + ',' + this.order];
    return result;
  }

  // Todo
  goDownToSearchPhase(searchPhase: string, inputHtml: string): void {
    const temp = this.renderer.createElement('template');
    temp.innerHTML = inputHtml.trim();
    const fakeElementRef: ElementRef<any> = {
      nativeElement: temp
    };
    console.log(fakeElementRef);

    const element = this.elementFinderService.findElementByContent(fakeElementRef, searchPhase);

    console.log(element);

    // if (element) {
    //   element.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'start',
    //     inline: 'nearest'
    //   });
    // }
  }

  output($event: any): void {
    console.log("output: ",$event.target.value);
  }
}
