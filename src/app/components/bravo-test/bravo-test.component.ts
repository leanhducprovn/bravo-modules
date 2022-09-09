import { Component, ElementRef, OnInit } from '@angular/core';

import * as wjc from '@grapecity/wijmo';

import { BravoToolbal } from '../../class/BravoToolbar';
@Component({
  selector: 'app-bravo-test',
  templateUrl: './bravo-test.component.html',
  styleUrls: ['./bravo-test.component.scss'],
})
export class BravoTestComponent extends wjc.Control implements OnInit {
  public constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  ngOnInit(): void {
    this.setToolbar();
  }
  private setToolbar() {
    new BravoToolbal(this.hostElement.querySelector('.toolbar'));
  }
}
