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

import { ImageValueType } from '../../types/enum/image-value-type.enum';
import { Convert } from '../../library/bravo-convert/convert';

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

  private _imageURL: string = '';
  public set imageURL(pValue: string) {
    if (this._imageURL == pValue) return;
    this._imageURL = pValue;
    this.invalidate();
  }
  public get imageURL(): string {
    return this._imageURL;
  }

  private _bAutoFitPicture: boolean = true;
  public set bAutoFitPicture(pValue: boolean) {
    if (this._bAutoFitPicture == pValue) return;
    this._bAutoFitPicture = pValue;
    this.invalidate();
  }
  public get bAutoFitPicture(): boolean {
    return this._bAutoFitPicture;
  }

  private _imageValueType: ImageValueType = ImageValueType.ByteArray;
  public set imageValueType(pValue: ImageValueType) {
    if (this._imageValueType == pValue) return;
    this._imageValueType = pValue;
    this.invalidate;
  }
  public get imageValueType(): ImageValueType {
    return this._imageValueType;
  }

  public value: any;
  public imageInfo!: string;
  public zoomPercent!: number;

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public onChange = (changed: any) => {};

  public onTouch = () => {};

  public writeValue(obj: any): void {
    this.value = obj;
    if (this.value instanceof Array) {
      this.imageURL =
        'data:image/png;base64,' +
        Convert.toBase64String(new Uint8Array(this.value));
    } else {
      this.imageURL = 'data:image/png;base64,' + this.value;
    }
  }

  public registerOnChange(changed: any): void {
    this.onChange = changed;
  }

  public registerOnTouched(touched: any): void {
    this.onTouch = touched;
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
    this.reader();
  }

  public ngOnInit(): void {
    this.setPopup();
  }

  public onUpload(e: any) {
    let _file = e.target.files[0];
    if (_file) {
      let _fileReader = new FileReader();
      _fileReader.readAsDataURL(e.target.files[0]);
      _fileReader.onload = (eFile: any) => {
        this.imageURL = eFile.target.result;
      };
    }
  }

  public onRemove() {
    let _imagePreview = this.hostElement?.querySelector(
      '.bravo-picture-preview img'
    );
    wjc.removeClass(_imagePreview!, 'default width-100 height-100');
    wjc.addClass(_imagePreview!, 'null');
    this._upload.nativeElement.value = '';
    this.imageURL = '';
    this.imageInfo = '';
    this._popup.hide();
  }

  public onZoom() {
    this._isZoom = !this._isZoom;
    let _image = this._popup.hostElement?.querySelector(
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
    let _image = this._popup.hostElement?.querySelector(
      '.bravo-picture-popup-preview img'
    );
    wjc.setCss(_image, {
      width: `${this.getCurrentWidth()! + this.getZoomValue() + 'px'}`,
    });
    this.zoomPercent = this.zoomPercent + 10;
  }

  public onZoomOut() {
    let _image = this._popup.hostElement?.querySelector(
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

  private reader(
    pValue: string = this.imageURL,
    pValueType: ImageValueType = this.imageValueType,
    pAutoFit: boolean = this.bAutoFitPicture
  ) {
    let _picturePreview = this.hostElement?.querySelector(
      '.bravo-picture-preview'
    );
    let _imagePreview = this.hostElement?.querySelector(
      '.bravo-picture-preview img'
    );
    let _imagePopupPreview = this._popup.hostElement?.querySelector(
      '.bravo-picture-popup-preview img'
    );
    let _image = new Image();
    _image.src = pValue;
    _image.onload = () => {
      this._imageWidth = _image.width;
      this.imageInfo = `${
        _image.width +
        'x' +
        _image.height +
        ' ' +
        '(' +
        this.formatBytes(this.getSizeBase64(pValue)) +
        ')'
      }`;

      if (_imagePreview && _picturePreview) {
        wjc.removeClass(_imagePreview!, 'null default width-100 height-100');
        if (pAutoFit) {
          if (_image.width >= 180) {
            if (_image.width > _image.height) {
              wjc.toggleClass(_imagePreview!, 'width-100');
            } else {
              wjc.toggleClass(_imagePreview!, 'height-100');
            }
          } else {
            wjc.toggleClass(_imagePreview!, 'default');
          }
        } else {
          wjc.setCss(_picturePreview, {
            overflow: 'auto',
          });
          wjc.setCss(_imagePreview, {
            width: 'unset',
            height: 'unset',
            position: 'unset',
            top: 'unset',
            left: 'unset',
            transform: 'unset',
          });
        }
      }
    };

    if (pValueType == ImageValueType.Base64String) {
      this.value = this.imageURL.replace(
        /^data:image\/(png|jpg|jpeg|gif|icon);base64,/,
        ''
      );
    } else {
      this.value = Convert.fromBase64String(
        this.imageURL.replace(
          /^data:image\/(png|jpg|jpeg|gif|icon);base64,/,
          ''
        )
      );
    }

    if (_imagePopupPreview) {
      wjc.setCss(_imagePopupPreview, {
        width: '100%',
      });
    }
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
    return this._popup.hostElement?.querySelector(
      '.bravo-picture-popup-preview img'
    )?.clientWidth;
  }

  private setPopup() {
    wjc.setCss(this.hostElement?.querySelector('.bravo-picture-popup'), {
      width: '300px',
      height: '200px',
      borderRadius: 'unset',
    });
    this._popup = new input.Popup(
      this.hostElement.querySelector('.bravo-picture-popup'),
      {
        owner: this.hostElement?.querySelector('.bravo-picture-dropdown'),
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
