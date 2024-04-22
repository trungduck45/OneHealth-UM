import { Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'jhi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  searchMenuItemValue = '';
  selectedId!: any;

  constructor() {}

  ngOnInit(): void {
    this.sideBarLoad();
  }

  searchMenuItem(): void {}

  script(): void {}

  selected(id: any): void {
    this.selectedId = id;
  }

  sideBarLoad(): void {
    $(window).resize(function(): void {
      $('#inner-scrollbar .scroll-content').height($(window).height()! - 50);
    });
    $(window).trigger('resize');
    Scrollbar.initAll();
    $('#barToggle').click(function(): void {
      $('#wrapper').toggleClass('extend');
    });
  }
}
