import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementFinderService {
  private htmlList: (HTMLElement | null)[] = [];

  constructor() {}

  findElementByContent(rootNode: ElementRef, searchText: string): (HTMLElement | null)[] {
    this.htmlList = [];
    this.findElement(rootNode.nativeElement, searchText);
    return this.htmlList;
  }

  private findElement(node: HTMLElement, searchText: string): HTMLElement | null {
    const children = node.children;

    if ((node.textContent ?? '').trim().includes(searchText) && children.length <= 0) {
      this.htmlList.push(node);
      return node;
    }

    for (let i = 0; i < children.length; i++) {
      this.findElement(children[i] as HTMLElement, searchText);
    }

    return null;
  }
}
