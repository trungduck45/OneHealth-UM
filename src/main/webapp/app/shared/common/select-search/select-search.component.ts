import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';

@Component({
  selector: 'jhi-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit {
  @Input() REQUEST_URL!: string;
  @Input() creating = false;
  @Input() editing = false;
  @Output() onSelect = new EventEmitter();

  @Input() selectedId!: number;

  entities: any[] = [];
  isLoadAllAlready = false;

  constructor(private dmService: DanhMucService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dmService
      .query(
        {
          page: 0,
          size: 1000,
          filter: this.filter(),
          sort: this.sort()
        },
        this.REQUEST_URL
      )
      .subscribe((response: HttpResponse<any>) => {
        if (response.body && response.body.code === 0) {
          this.entities = response.body.result.content;
        }
      });
  }

  filter(): string {
    return 'name=="*"';
  }

  sort(): string[] {
    return ['id,desc'];
  }

  onChange($event: any): void {
    this.onSelect.emit($event);
  }
}
