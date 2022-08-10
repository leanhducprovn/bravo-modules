import { Component, ElementRef, OnInit } from '@angular/core';
import * as wjc from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';

@Component({
  selector: 'bravo-control-base',
  templateUrl: './bravo-control-base.component.html',
  styleUrls: ['./bravo-control-base.component.scss'],
})
export class BravoControlBaseComponent extends wjc.Control implements OnInit {
  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  private _calendar!: input.Calendar;

  ngOnInit(): void {
    this.getCollection('calendar').forEach((element) => {
      this._calendar = new input.Calendar(element);
    });
  }

  public onClick() {}

  override refresh(fullUpdate?: boolean | undefined): void {}

  public onT8() {
    this._calendar.displayMonth = new Date(2022, 7);
  }

  public onT9() {
    this._calendar.displayMonth = new Date(2022, 8);
  }

  public onT10() {
    this._calendar.displayMonth = new Date(2022, 9);
  }

  private getCollection(...className: Array<string>) {
    const _elements = new Array<HTMLElement>();
    for (const zClassName of className) {
      _elements.push(
        ...Array.from(
          this.hostElement?.getElementsByClassName(
            zClassName
          ) as HTMLCollectionOf<HTMLElement>
        )
      );
    }
    return _elements;
  }
}
