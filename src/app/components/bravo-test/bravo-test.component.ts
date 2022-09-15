import { Component, ElementRef, OnInit } from '@angular/core';

import * as wjc from '@grapecity/wijmo';

@Component({
  selector: 'app-bravo-test',
  templateUrl: './bravo-test.component.html',
  styleUrls: ['./bravo-test.component.scss'],
})
export class BravoTestComponent extends wjc.Control implements OnInit {
  public constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  ngOnInit(): void {}
}
