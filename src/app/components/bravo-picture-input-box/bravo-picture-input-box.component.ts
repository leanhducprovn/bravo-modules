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
  private _isZoom: boolean = false;
  private _imageWidth!: number;
  private _currentWidth!: number;

  public imageInfo!: string;
  public base64Url!: string;
  public zoomPercent!: number;

  @ViewChild('upload') private _upload!: ElementRef;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  public onUpload(e: any) {
    // get image element
    let _eImage = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );

    // get image info
    let _imageSize = e.target.files[0].size;
    let _url = window.URL || window.webkitURL;
    let _image = new Image();
    _image.src = _url.createObjectURL(e.target.files[0]);
    _image.onload = () => {
      this._imageWidth = _image.width;
      this.imageInfo = `${
        _image.width +
        'x' +
        _image.height +
        ' ' +
        '(' +
        this.formatBytes(_imageSize) +
        ')'
      }`;
      // get zoom percent
      if (_eImage) {
        this.zoomPercent = Math.round(
          (_eImage.clientWidth / _image.width) * 100
        );
      }
    };
    // get base64url
    let _fileReader = new FileReader();
    _fileReader.readAsDataURL(e.target.files[0]);
    _fileReader.onload = (eFile: any) => {
      this.base64Url = eFile.target.result;
    };

    // set image width
    wjc.setCss(_eImage, {
      width: '100%',
    });
  }

  public onRemove() {
    this._upload.nativeElement.value = '';
    this.base64Url = '';
    this.imageInfo = '';
    this._popup.hide();
  }

  public onZoom() {
    this._isZoom = !this._isZoom;
    let _image = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    if (this._isZoom) {
      wjc.setCss(_image, {
        width: 'auto',
      });
    } else {
      wjc.setCss(_image, {
        width: '100%',
      });
    }
  }

  public onZoomIn() {
    let _image = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    let _currWidth = _image?.clientWidth;
    if (_currWidth) {
      wjc.setCss(_image, {
        width: `${_currWidth + 100 + 'px'}`,
      });
    }
  }

  public onZoomOut() {
    let _image = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    let _currWidth = _image?.clientWidth;
    if (_currWidth) {
      wjc.setCss(_image, {
        width: `${_currWidth - 100 + 'px'}`,
      });
    }
  }

  public onPopup() {
    let _eImage = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    if (_eImage) {
      this.zoomPercent = Math.round(
        (_eImage.clientWidth / this._imageWidth) * 100
      );
    }
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
