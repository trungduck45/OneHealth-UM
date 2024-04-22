import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { jqxTreeGridComponent } from 'jqwidgets-ng/jqxtreegrid';
import { jqxDropDownButtonComponent } from 'jqwidgets-ng/jqxdropdownbutton';
import { DanhMucService } from 'app/entities/danhmuc/danhmuc.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-select-tree-grid',
  templateUrl: './select-tree-grid.component.html',
  styleUrls: ['./select-tree-grid.component.scss']
})
export class SelectTreeGridComponent implements OnInit, OnChanges {
  @Input() REQUEST_URL = '';
  @Input() creating = false;
  @Input() editing = false;
  @Output() onSelect = new EventEmitter();
  @Input() dropdownButtonContent = '';

  listEntity!: any[];

  // ------------- treegrid view
  @ViewChild('unitTreeGrid', { static: false }) unitTreeGrid!: jqxTreeGridComponent;
  @ViewChild('unitDropDownButton', { static: false }) unitDropDownButton!: jqxDropDownButtonComponent;
  source: any = {
    dataType: 'json',
    dataFields: [
      { name: 'id', type: 'number' },
      { name: 'parentDataField', type: 'number' },
      { name: 'name', type: 'string' }
    ],
    hierarchy: {
      keyDataField: { name: 'id' },
      parentDataField: { name: 'parentDataField' }
    },
    id: 'id',
    localData: []
  };

  dataAdapter: any;

  columns = [{ text: 'Name', dataField: 'name' }];
  // --------- end treegrid view

  constructor(private dmService: DanhMucService) {}

  ngOnChanges(changes: SimpleChanges): void {
    /**
     * ở đây có thể xảy ra trường hợp unitDropdownButton chưa sẵn sàng, nên cần check
     */
    if (changes.dropdownButtonContent && this.unitDropDownButton) {
      this.unitDropDownButton.setContent(changes.dropdownButtonContent.currentValue);
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dmService
      .query(
        {
          sort: ['id,desc'],
          page: 0,
          size: 100,
          filter: 'code=="**"'
        },
        this.REQUEST_URL
      )
      .subscribe(
        (res: HttpResponse<any>) => {
          this.listEntity = res.body && res.body.result ? res.body.result.content : [];
          this.addParentDataField(this.listEntity);
          this.source.localData = this.listEntity;
          this.dataAdapter = new jqx.dataAdapter(this.source);
        },
        () => {
          console.error();
        }
      );
  }

  addParentDataField(listGroup: any[]): void {
    listGroup.forEach(unitItem => {
      unitItem.parentDataField = unitItem.parent ? unitItem.parent.id : null;
      delete unitItem['parent'];
    });
  }

  selectParent(e: any): void {
    this.onSelect.emit(e.args.row.id);
    // this.selectedId = e.args.row.id;
    // console.log(this.selectedId);
    this.unitDropDownButton.close();
    this.unitDropDownButton.setContent(e.args.row.name);
  }
}
