import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jhi-app-tree-content',
  templateUrl: './tree-content.component.html',
  styleUrls: ['./tree-content.component.scss']
})
export class TreeContentComponent {
  @Input() hierarchicalList!: HierarchicalItem[];
  @Output() goDownToElement = new EventEmitter<any>();
  @Output() goDownToChildElement = new EventEmitter<any>();

  getStyle(item: HierarchicalItem): Object {
    let fontSize = 16;
    let marginTop = 8;
    let marginLeft = 0;

    if (item.level === 1) {
      fontSize = 16;
      marginTop = 8;
      marginLeft = 0;
    } else if (item.level === 2) {
      fontSize = 14;
      marginTop = 6;
      marginLeft = 10;
    } else if (item.level === 3) {
      fontSize = 12;
      marginTop = 4;
      marginLeft = 20;
    } else if (item.level === 4) {
      fontSize = 10;
      marginTop = 2;
      marginLeft = 30;
    } else if (item.level === 5) {
      fontSize = 8;
      marginTop = 0;
      marginLeft = 40;
    }

    const objStyle = { 'font-size.px': fontSize, color: 'black', 'margin-top.px': marginTop, 'margin-left.px': marginLeft };

    return objStyle;
  }

  clickGoToElement(level: number, heading: string): void {
    const input = { level: '' + level, heading };
    console.log(input);

    this.goDownToElement.emit(input);
    this.goDownToChildElement.emit(input);
  }

  childGoDownToChildElement($event: { level: string; heading: string }): void {
    const input = { level: '' + $event.level, heading: $event.heading };
    this.goDownToElement.emit(input);
  }
}

interface HierarchicalItem {
  level: number;
  heading: string;
  content?: string;
  children?: HierarchicalItem[];
}
