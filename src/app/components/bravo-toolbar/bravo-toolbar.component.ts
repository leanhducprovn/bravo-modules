import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
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
export class BravoToolbarComponent
  extends wjc.Control
  implements OnInit, AfterViewInit
{
  public tools: Tool[] = [
    { image: './assets/img/OpenFolder.svg', title: 'Upload' },
    { image: './assets/img/Save.png', title: 'Save' },
    { image: './assets/img/Printer.png', title: 'Printing' },
    { image: './assets/img/Delete.png', title: 'Delete' },
    { image: './assets/img/Paste.svg', title: 'Paste' },
    { image: './assets/img/Copy.png', title: 'Copy' },
    { image: './assets/img/favicon.png', title: 'Rotate left' },
    { image: './assets/img/favicon.png', title: 'Rotate right' },
    { image: './assets/img/favicon.png', title: 'Flip vertical' },
    { image: './assets/img/favicon.png', title: 'Flip horizontal' },
    { image: './assets/img/favicon.png', title: 'Crop picture' },
    { image: './assets/img/favicon.png', title: 'Resize picture' },
    { image: './assets/img/favicon.png', title: 'Brightness' },
    { image: './assets/img/favicon.png', title: 'Color' },
    { image: './assets/img/favicon.png', title: 'Opacity' },
  ];

  public moreTools!: Tool[];

  private _popup!: input.Popup;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  ngOnInit(): void {
    this.setPopup();
  }

  ngAfterViewInit(): void {
    this.responsive();
  }

  private responsive() {
    let _toolbar = this.hostElement?.querySelector('.bravo-toolbar');
    let _more = this.hostElement?.querySelector('.more');
    let _zoom = this.hostElement?.querySelector('.zoom');
    if (_toolbar && _more && _zoom) {
      let _width = _toolbar.clientWidth - _zoom.clientWidth;
      if (_width < 300) {
        wjc.setCss(_more, {
          display: 'block',
        });
      }
      this.moreTools = this.tools.slice(
        Math.floor(_width / 20),
        this.tools.length
      );
    }
  }

  // popup
  private setPopup() {
    this._popup = new input.Popup(
      this.hostElement?.querySelector('.more-popup'),
      {
        owner: this.hostElement?.querySelector('.more'),
        position: wjc.PopupPosition.AboveRight,
        showTrigger: input.PopupTrigger.ClickOwner,
        hideTrigger:
          input.PopupTrigger.Blur |
          input.PopupTrigger.ClickOwner |
          input.PopupTrigger.Leave,
      }
    );
    // this._popup.shown.addHandler((e: input.Popup) => {
    //   this.isPopup = e.isVisible;
    // });
    // this._popup.hidden.addHandler((e: input.Popup) => {
    //   this.isPopup = e.isVisible;
    // });
  }
}

export interface Tool {
  image: string;
  title: string;
}
