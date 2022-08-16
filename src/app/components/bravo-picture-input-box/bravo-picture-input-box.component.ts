import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';

@Component({
  selector: 'bravo-picture-input-box',
  templateUrl: './bravo-picture-input-box.component.html',
  styleUrls: ['./bravo-picture-input-box.component.scss'],
})
export class BravoPictureInputBoxComponent
  extends wjc.Control
  implements OnInit
{
  private _popup!: input.Popup;
  private _imageSize!: number;

  public imageInfo!: string;
  public base64Url!: string;

  @ViewChild('upload') private _upload!: ElementRef;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  public onUpload(e: any) {
    this._imageSize = e.target.files[0].size;
    let _url = window.URL || window.webkitURL;
    let _imgage = new Image();
    _imgage.src = _url.createObjectURL(e.target.files[0]);
    _imgage.onload = () => {
      this.imageInfo = `${
        _imgage.width +
        'x' +
        _imgage.height +
        ' ' +
        '(' +
        this.formatBytes(this._imageSize) +
        ')'
      }`;
    };

    let _fileReader = new FileReader();
    _fileReader.readAsDataURL(e.target.files[0]);
    _fileReader.onload = (eFile: any) => {
      this.base64Url = eFile.target.result;
    };
  }

  public onRemove() {
    this._upload.nativeElement.value = '';
    this.base64Url = '';
    this.imageInfo = '';
    this._popup.hide();
  }

  private setPopup() {
    wjc.setCss(this.hostElement.querySelector('.bravo-picture-popup'), {
      width: '300px',
      height: '200px',
      borderRadius: 'unset',
    });
    this._popup = new input.Popup(
      this.hostElement.querySelector('.bravo-picture-popup'),
      {
        owner: this.hostElement.querySelector('.bravo-picture-dropdown'),
        position: wjc.PopupPosition.BelowRight,
        showTrigger: input.PopupTrigger.ClickOwner,
        hideTrigger: input.PopupTrigger.Blur | input.PopupTrigger.ClickOwner,
        isResizable: true,
      }
    );
  }

  private formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  }
}
