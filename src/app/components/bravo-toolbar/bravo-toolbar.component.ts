import { Component, ElementRef, Input, OnInit } from '@angular/core';
import * as wjc from '@grapecity/wijmo';
import * as input from '@grapecity/wijmo.input';

@Component({
  selector: 'bravo-toolbar',
  templateUrl: './bravo-toolbar.component.html',
  styleUrls: [
    './bravo-toolbar.component.css',
    './bravo-toolbar.component.scss',
  ],
})
export class BravoToolbarComponent extends wjc.Control implements OnInit {
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

  public isMore: boolean = false;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  ngOnInit(): void {
    this.setMenu();
    this.setPopup();
    this.responsive();
  }

  private setMenu() {
    let _listBox = this.hostElement?.querySelector('.list-box');
    this._listBox = new input.ListBox(_listBox, {
      formatItem: (sender: any, e: any) => {
        e.item.innerHTML = `<img src="${e.data.image}" title="${e.data.title}" style="width:15px">`;
      },
      itemsSource: this.tools,
    });

    let _listBoxMore = this.hostElement?.querySelector('.list-box-more');
    this._listBoxMore = new input.ListBox(_listBoxMore, {
      formatItem: (sender: any, e: any) => {
        e.item.innerHTML = `<img src="${e.data.image}" title="${e.data.title}" style="width:15px">`;
      },
      itemsSource: [],
    });
  }

  public onClick(value: number) {
    console.log(value);
  }

  private responsive() {
    let _listBox = this.hostElement?.querySelector('.list-box');
    let _more = this.hostElement?.querySelector('.list-more');
    if (_listBox) {
      let _defWidth = this.tools.length * 20;
      let _clientWidth = _listBox?.clientWidth;
      if (_clientWidth >= _defWidth) {
        return;
      } else {
        let _countItem = Math.floor(_clientWidth / 20) - 1;
        this._listBox.itemsSource = this.tools.slice(0, _countItem);
        this._listBoxMore.itemsSource = this.tools.slice(
          _countItem,
          this.tools.length
        );
        if (_more) {
          wjc.setCss(_more, {
            display: 'block',
          });
        }
      }
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
