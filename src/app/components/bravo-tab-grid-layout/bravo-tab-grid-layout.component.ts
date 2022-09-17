import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as wjc from '@grapecity/wijmo';

@Component({
  selector: 'app-bravo-tab-grid-layout',
  templateUrl: './bravo-tab-grid-layout.component.html',
  styleUrls: [
    './bravo-tab-grid-layout.component.css',
    './bravo-tab-grid-layout.component.scss',
  ],
})
export class BravoTabGridLayoutComponent
  extends wjc.Control
  implements OnInit, OnDestroy
{
  private _subscription!: Subscription;

  public tabsInfo!: any[];

  constructor(private http: HttpClient, elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
  }

  public ngOnInit(): void {
    this.getData();
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private getData() {
    const _api = './assets/data/cash-receipts.json';
    let _headers: any[];
    let _data: any;
    this._subscription = this.http.get(_api).subscribe(
      (res: any) => {
        _headers = Object.keys(res);
        _data = res;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.initTabsInfo(_headers, _data);
      }
    );
  }

  private initTabsInfo(pHeader: any[], pData: any) {
    let headers = pHeader;
    this.tabsInfo = [];
    headers.forEach((header) => {
      this.tabsInfo.push({
        header: header,
        data: pData[header],
      });
    });
    this.setHeaderStyle();
  }

  private setHeaderStyle() {
    let _panel = this.hostElement?.querySelector('wj-tab-panel div');
    wjc.setCss(_panel, {
      display: 'flex',
      flexDirection: 'column-reverse',
    });
    let _parent = this.hostElement?.querySelector('.wj-tabheaders') as any;
    if (_parent) {
      let _wrapper = document.createElement('div');
      wjc.addClass(_wrapper, 'tab-headers');
      _parent.parentNode.appendChild(_wrapper);
      _wrapper.appendChild(_parent);
    }
  }
}
