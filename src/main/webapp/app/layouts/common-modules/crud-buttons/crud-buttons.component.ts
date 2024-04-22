import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'jhi-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.scss']
})
export class CrudButtonsComponent implements OnInit {
  @Output() onSave = new EventEmitter();
  @Output() onCreate = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  @Input() editing = false;
  @Input() choosing = false;
  @Input() creating = false;

  constructor() {}

  ngOnInit(): void {}
}
