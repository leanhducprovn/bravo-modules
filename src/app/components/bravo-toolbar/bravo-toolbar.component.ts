import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as wjc from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';

import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'bravo-toolbar',
  templateUrl: './bravo-toolbar.component.html',
  styleUrls: [
    './bravo-toolbar.component.css',
    './bravo-toolbar.component.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BravoToolbarComponent),
    },
  ],
})
export class BravoToolbarComponent
  extends wjc.Control
  implements OnInit, AfterViewInit
{
  private _tools: Tool[] = [];
  @Input()
  public set tools(pValue: Tool[]) {
    if (this._tools == pValue) return;
    this._tools = pValue;
  }
  public get tools(): Tool[] {
    return this._tools;
  }

  private _listBox!: input.ListBox;
  private _listBoxMore!: input.ListBox;
  private _popup!: input.Popup;

  private _sizeBox: wjc.Size = new wjc.Size();
  public set sizeBox(pValue: wjc.Size) {
    if (this._sizeBox == pValue) return;
    this._sizeBox = pValue;
    this.invalidate();
  }
  public get sizeBox(): wjc.Size {
    return this._sizeBox;
  }

  public isMore: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public onChange = (changed: any) => {};

  public onTouch = () => {};

  public writeValue(obj: any): void {
    this.tools = obj;
  }

  public registerOnChange(changed: any): void {
    this.onChange = changed;
  }

  public registerOnTouched(touched: any): void {
    this.onTouch = touched;
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
    this.responsive();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setMenu();
    this.setPopup();
    // this.responsive();
    this.onResize();
  }

  private onResize() {
    let _listBox = this.hostElement?.querySelector('.bravo-toolbar');
    const menu = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.sizeBox = new wjc.Size(width, height);
      }
    });
    if (_listBox) menu.observe(_listBox);
  }

  private setMenu() {
    let _listBox = this.hostElement?.querySelector('.list-box');
    this._listBox = new input.ListBox(_listBox, {
      formatItem: (sender: any, e: any) => {
        e.item.innerHTML = `<img src="${e.data.image}" title="${e.data.title}" style="width:15px">`;
        e.item.addEventListener('click', () => {
          setTimeout(() => {
            this.onChange(sender);
          });
        });
      },
      itemsSource: this.tools,
    });

    let _listBoxMore = this.hostElement?.querySelector('.list-box-more');
    this._listBoxMore = new input.ListBox(_listBoxMore, {
      formatItem: (sender: any, e: any) => {
        e.item.innerHTML = `<img src="${e.data.image}" title="${e.data.title}" style="width:15px">`;
        e.item.addEventListener('click', () => {
          setTimeout(() => {
            this.onChange(sender);
          });
        });
      },
      itemsSource: [],
    });
  }

  private responsive() {
    let _listBox = this.hostElement?.querySelector('.list-box');
    let _more = this.hostElement?.querySelector('.list-more');
    if (_listBox && _more) {
      let _defWidth = this.tools.length * 20;
      let _clientWidth = this.sizeBox.width;
      console.log(_clientWidth);
      if (_clientWidth < _defWidth) {
        this._listBox.itemsSource = this.tools.slice(
          0,
          Math.floor(_clientWidth / 20)
        );
      }
      // if (_clientWidth >= _defWidth) {
      //   return;
      // } else {
      //   let _countItem = Math.floor(_clientWidth / 20) - 1;
      //   this._listBox.itemsSource = this.tools.slice(0, _countItem);
      //   this._listBoxMore.itemsSource = this.tools.slice(
      //     _countItem,
      //     this.tools.length
      //   );

      //   wjc.setCss(_more, {
      //     display: 'block',
      //   });
      // }
    }
  }

  private setPopup() {
    let _morePopup = this.hostElement?.querySelector('.more-popup');
    let _listMore = this.hostElement?.querySelector('.list-more');
    if (_listMore && _morePopup) {
      this._popup = new input.Popup(_morePopup, {
        owner: _listMore,
        position: wjc.PopupPosition.AboveRight,
        showTrigger: input.PopupTrigger.ClickOwner,
        hideTrigger:
          input.PopupTrigger.Blur |
          input.PopupTrigger.ClickOwner |
          input.PopupTrigger.Leave,
      });
    }

    this._popup.shown.addHandler((e: input.Popup) => {
      this.isMore = e.isVisible;
      Array.from(
        this._popup.hostElement?.getElementsByClassName('wj-listbox-item')
      ).forEach((e) => {
        wjc.setCss(e, {
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          padding: '1.5px',
          border: '1px solid transparent',
        });
        e.addEventListener('mouseover', () => {
          wjc.setCss(e, {
            'background-color': '#E0EEF9',
            border: '1px solid #568FBA',
            'border-radius': '2px',
          });
        });
        e.addEventListener('mouseout', () => {
          wjc.setCss(e, {
            'background-color': 'unset',
            border: '1px solid transparent',
            'border-radius': 'unset',
          });
        });
      });
    });

    this._popup.hidden.addHandler((e: input.Popup) => {
      this.isMore = e.isVisible;
    });
  }
}

export interface Tool {
  image: string;
  title: string;
  value: number;
}
