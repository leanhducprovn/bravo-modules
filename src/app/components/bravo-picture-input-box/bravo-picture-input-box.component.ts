import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bravo-picture-input-box',
  templateUrl: './bravo-picture-input-box.component.html',
  styleUrls: ['./bravo-picture-input-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BravoPictureInputBoxComponent),
    },
  ],
})
export class BravoPictureInputBoxComponent
  extends wjc.Control
  implements OnInit
{
  @ViewChild('upload') private _upload!: ElementRef;

  private _popup!: input.Popup;
  private _isZoom: boolean = false;
  private _imageWidth!: number;
  private _currentZoomPercent!: number;

  public imageInfo!: string;
  public base64Url!: string;
  public zoomPercent!: number;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public onChange = (changed: any) => {};

  public onTouch = () => {};

  public writeValue(obj: any): void {
    this.base64Url = obj;
    let _imagePreview = this.hostElement.querySelector(
      '.bravo-picture-preview img'
    );
    let _imagePopupPreview = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    let _input = this.hostElement.querySelector('.bravo-picture-preview input');
    let _image = new Image();
    _image.src = this.base64Url;
    _image.onload = () => {
      this._imageWidth = _image.width;
      this.imageInfo = `${
        _image.width +
        'x' +
        _image.height +
        ' ' +
        '(' +
        this.formatBytes(this.getSizeBase64(this.base64Url)) +
        ')'
      }`;
      wjc.removeClass(_imagePreview!, 'null default width-100 height-100');
      wjc.removeClass(_input!, 'none');
      if (_image.width >= 180) {
        if (_image.width > _image.height) {
          wjc.toggleClass(_imagePreview!, 'width-100');
        } else {
          wjc.toggleClass(_imagePreview!, 'height-100');
        }
      } else {
        wjc.toggleClass(_imagePreview!, 'default');
      }
      wjc.toggleClass(_input!, 'none');
    };
    wjc.setCss(_imagePopupPreview, {
      width: '100%',
    });
  }

  public registerOnChange(changed: any): void {
    this.onChange = changed;
  }

  public registerOnTouched(touched: any): void {
    this.onTouch = touched;
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  public onUpload(e: any) {
    // get image element
    let _imagePreview = this.hostElement.querySelector(
      '.bravo-picture-preview img'
    );
    let _imagePopupPreview = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );

    // get input element
    let _input = this.hostElement.querySelector('.bravo-picture-preview input');

    // get image info
    let _imageSize: number;
    if (e.target.files[0]) {
      _imageSize = e.target.files[0].size;
    } else {
      return;
    }
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

      // remove class
      wjc.removeClass(_imagePreview!, 'null default width-100 height-100');
      wjc.removeClass(_input!, 'none');

      // set picture preview
      if (_image.width >= 180) {
        if (_image.width > _image.height) {
          wjc.toggleClass(_imagePreview!, 'width-100');
        } else {
          wjc.toggleClass(_imagePreview!, 'height-100');
        }
      } else {
        wjc.toggleClass(_imagePreview!, 'default');
      }
      wjc.toggleClass(_input!, 'none');

      // set zoom percent
      if (_imagePopupPreview) {
        this.setZoomPercent();
      }
    };
    // get base64url
    let _fileReader = new FileReader();
    _fileReader.readAsDataURL(e.target.files[0]);
    _fileReader.onload = (eFile: any) => {
      this.base64Url = eFile.target.result;
    };

    // set image popup width
    wjc.setCss(_imagePopupPreview, {
      width: '100%',
    });
  }

  public onRemove() {
    let _imagePreview = this.hostElement.querySelector(
      '.bravo-picture-preview img'
    );
    let _input = this.hostElement.querySelector('.bravo-picture-preview input');
    wjc.removeClass(_imagePreview!, 'default width-100 height-100');
    wjc.removeClass(_input!, 'none');
    wjc.addClass(_imagePreview!, 'null');
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
      this.zoomPercent = 100;
    } else {
      wjc.setCss(_image, {
        width: '100%',
      });
      this.zoomPercent = this._currentZoomPercent;
    }
  }

  public onZoomIn() {
    let _image = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    wjc.setCss(_image, {
      width: `${this.getCurrentWidth()! + this.getZoomValue() + 'px'}`,
    });
    this.zoomPercent = this.zoomPercent + 10;
  }

  public onZoomOut() {
    let _image = this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    );
    wjc.setCss(_image, {
      width: `${this.getCurrentWidth()! - this.getZoomValue() + 'px'}`,
    });
    if (this.zoomPercent >= 10) {
      this.zoomPercent = this.zoomPercent - 10;
    }
  }

  public onPopup() {
    this.setZoomPercent();
  }

  private getZoomValue() {
    return (this._imageWidth * 10) / 100;
  }

  private setZoomPercent() {
    this.zoomPercent = Math.round(
      (this.getCurrentWidth()! / this._imageWidth) * 100
    );
    this._currentZoomPercent = this.zoomPercent;
  }

  private getCurrentWidth() {
    return this._popup.hostElement.querySelector(
      '.bravo-picture-popup-preview img'
    )?.clientWidth;
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

  private getSizeBase64(base64: string) {
    let stringLength = base64.length - 'data:image/png;base64,'.length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    return sizeInBytes;
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
