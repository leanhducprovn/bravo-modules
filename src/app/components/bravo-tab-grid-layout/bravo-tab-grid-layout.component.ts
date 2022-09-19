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
      wjc.setCss(_wrapper, {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: '#f0f0f0',
      });
      _parent.parentNode.appendChild(_wrapper);
      _wrapper.appendChild(_parent);

      if (_wrapper) {
        let _scroll = document.createElement('div');
        wjc.addClass(_scroll, 'tab-scroll');
        wjc.setCss(_scroll, {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
        });
        _wrapper.appendChild(_scroll);

        if (_scroll) {
          let _left = document.createElement('button');
          let _right = document.createElement('button');
          wjc.addClass(_left, 'left');
          wjc.addClass(_right, 'right');
          wjc.setCss([_left, _right], {
            width: '18px',
            height: '18px',
            border: '1px solid #acacac',
            background: '#e9e9e9',
          });
          _left.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="10" height="10" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,64.00000190734863,-0.0000019073486328125)"><g xmlns="http://www.w3.org/2000/svg" id="Arrow-13"><path d="m54.9210777 20.296875c-.15625-.3701172-.5185547-.6108398-.9208984-.6108398l-44 .0004883c-.4018555 0-.7646484.2407227-.9213867.6108398-.15625.3701172-.0756836.7983398.2045898 1.0864258l22 22.6274414c.1879883.1933594.4467773.3027344.7167969.3027344s.5288086-.109375.7167969-.3027344l22-22.6279297c.2802734-.2885742.3603515-.7163086.2041015-1.0864258z" fill="#000000" data-original="#000000" class=""></path></g></g></svg>`;
          _right.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" width="10" height="10" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g transform="matrix(-6.123233995736766e-17,1,1,6.123233995736766e-17,0.0000019073486328125,-0.0000019073486328125)"><g xmlns="http://www.w3.org/2000/svg" id="Arrow-13"><path d="m54.9210777 20.296875c-.15625-.3701172-.5185547-.6108398-.9208984-.6108398l-44 .0004883c-.4018555 0-.7646484.2407227-.9213867.6108398-.15625.3701172-.0756836.7983398.2045898 1.0864258l22 22.6274414c.1879883.1933594.4467773.3027344.7167969.3027344s.5288086-.109375.7167969-.3027344l22-22.6279297c.2802734-.2885742.3603515-.7163086.2041015-1.0864258z" fill="#000000" data-original="#000000" class=""></path></g></g></svg>`;
          _scroll.appendChild(_left);
          _scroll.appendChild(_right);
          this.hoverTabScroll(_left);
          this.hoverTabScroll(_right);
          _left.addEventListener('click', () => {
            _parent.scrollLeft = _parent.scrollLeft - 100;
          });
          _right.addEventListener('click', () => {
            _parent.scrollLeft = _parent.scrollLeft + 100;
          });
        }
      }
    }
  }

  private hoverTabScroll(e: any) {
    e.addEventListener('mouseover', () => {
      wjc.setCss(e, {
        'background-color': '#E0EEF9',
        border: '1px solid #568FBA',
      });
    });
    e.addEventListener('mouseout', () => {
      wjc.setCss(e, {
        'background-color': '#e9e9e9',
        border: '1px solid #acacac',
      });
    });
  }
}
