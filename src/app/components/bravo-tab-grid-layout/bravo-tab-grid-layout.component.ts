import { Component, OnDestroy, OnInit } from '@angular/core';
import * as wjOdata from '@grapecity/wijmo.odata';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bravo-tab-grid-layout',
  templateUrl: './bravo-tab-grid-layout.component.html',
  styleUrls: [
    './bravo-tab-grid-layout.component.css',
    './bravo-tab-grid-layout.component.scss',
  ],
})
export class BravoTabGridLayoutComponent implements OnInit, OnDestroy {
  private _subscription!: Subscription;

  public tabsInfo!: any[];

  constructor(private http: HttpClient) {}

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
  }
}
