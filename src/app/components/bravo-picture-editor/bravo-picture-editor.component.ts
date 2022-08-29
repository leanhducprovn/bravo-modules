import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';

import { ChangeContext, Options } from '@angular-slider/ngx-slider';

import { ImageValueType } from '../../types/enum/image-value-type.enum';
import { Convert } from '../../library/bravo-convert/convert';

interface SliderModel {
  value: number;
  options: Options;
}

@Component({
  selector: 'bravo-picture-editor',
  templateUrl: './bravo-picture-editor.component.html',
  styleUrls: [
    './bravo-picture-editor.component.scss',
    './customize-slider.css',
  ],
})
export class BravoPictureEditorComponent extends wjc.Control implements OnInit {
  @ViewChild('upload') private _upload!: ElementRef;

  private _popup!: input.Popup;
  private _imageWidth!: number;
  private _imageHeight!: number;
  private _intrinsicSize!: string;

  public isZoom: boolean = false;
  public isBrightness: boolean = false;
  public isColor: boolean = false;
  public isBackground: boolean = false;
  public isPopup: boolean = false;

  public zoomSlider!: SliderModel;
  public brightnessSliderLeft!: SliderModel;
  public brightnessSliderRight!: SliderModel;
  public colorSlider!: SliderModel;
  public backgroundSlider!: SliderModel;

  public value: any;
  public imageInfo!: string;
  public renderedSize!: string;

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

  private _maximumZoomSize: number = 6000;
  public set maximumZoomSize(pValue: number) {
    if (this._maximumZoomSize == pValue) return;
    this._maximumZoomSize = pValue;
    this.invalidate();
  }
  public get maximumZoomSize(): number {
    return this._maximumZoomSize;
  }

  private _minimumZoomSize: number = 12;
  public set minimumZoomSize(pValue: number) {
    if (this._minimumZoomSize == pValue) return;
    this._minimumZoomSize = pValue;
    this.invalidate();
  }
  public get minimumZoomSize(): number {
    return this._minimumZoomSize;
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

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
    this.reader();
    this.setSlider();
  }

  public ngOnInit(): void {
    this.setPopup();
    this.setZoomSlider();
    this.setColorSlider();
    this.setBrightnessSlider();
    this.setBackgroundSlider();
  }

  public onSaveEdit() {
    let previewImg = this.hostElement?.querySelector(
      '.bravo-picture-preview img' as any
    );
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    if (previewImg) {
      canvas.width = this._imageWidth;
      canvas.height = this._imageHeight;

      if (ctx) {
        ctx.filter = `invert(${100}%)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(1, 1);
        ctx.drawImage(
          previewImg,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );
      }
    }

    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
  }

  public onPaste(e: any) {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    let blob = null;
    for (const item of items) {
      if (item.type.indexOf('image') === 0) {
        blob = item.getAsFile();
        console.log(blob);
      }
    }
  }

  public async onCopy() {
    try {
      const imgURL = this.imageURL;
      const data = await fetch(imgURL);
      const blob = await data.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
    } catch (err) {
      console.log(err);
    }
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
    if (_imagePreview) {
      wjc.removeClass(_imagePreview!, 'default width-100 height-100');
      wjc.addClass(_imagePreview!, 'null');
    }
    this._upload.nativeElement.value = '';
    this.imageURL = '';
    this.imageInfo = '';
    this.renderedSize = '';
    this.value = '';
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
    let _image = new Image();
    _image.src = pValue;
    _image.onload = () => {
      this._imageWidth = _image.width;
      this._imageHeight = _image.height;
      this._intrinsicSize = _image.width + 'x' + _image.height;
      if (_imagePreview && _picturePreview) {
        wjc.removeClass(_imagePreview!, 'null default width-100 height-100');
        wjc.setAttribute(_imagePreview!, 'style', null);
        if (pAutoFit) {
          if (_image.width >= 196) {
            if (_image.width > _image.height) {
              wjc.toggleClass(_imagePreview!, 'width-100');
            } else {
              if (_picturePreview.clientWidth > _picturePreview.clientHeight) {
                wjc.toggleClass(_imagePreview!, 'height-100');
              } else {
                wjc.toggleClass(_imagePreview!, 'width-100');
              }
            }
          } else {
            wjc.toggleClass(_imagePreview!, 'default');
          }
          this.zoomSlider.value = Math.round(
            (_imagePreview.clientWidth / _image.width) * 100
          );
        } else {
          wjc.setCss(_picturePreview, {
            overflow: 'auto',
          });
          wjc.setCss(_imagePreview, {
            width: 'unset',
            height: 'unset',
          });
          this.zoomSlider.value = 100;
        }
        this.renderedSize =
          _imagePreview.clientWidth + 'x' + _imagePreview.clientHeight;
      }
      this.imageInfo = `${
        ' / ' +
        this._intrinsicSize +
        ' (' +
        this.formatBytes(this.getSizeBase64(pValue)) +
        ')'
      }`;
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
  }

  private setBackgroundSlider() {
    this.backgroundSlider = {
      value: 10,
      options: {
        floor: 0,
        ceil: 10,
        step: 1,
        vertical: true,
        disabled: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  public onBackgroundSliderChange(changeContext: ChangeContext) {
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        opacity: changeContext.value / 10,
      });
    }
  }

  private setBrightnessSlider() {
    this.brightnessSliderLeft = {
      value: 100,
      options: {
        floor: 0,
        ceil: 200,
        step: 10,
        vertical: true,
        disabled: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
    this.brightnessSliderRight = {
      value: 100,
      options: {
        floor: 0,
        ceil: 200,
        step: 10,
        vertical: true,
        disabled: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  public onBrightnessSliderLeftChange(changeContext: ChangeContext) {
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        filter: `${'brightness' + '(' + changeContext.value + '%)'}`,
      });
    }
  }

  public onBrightnessSliderRightChange(changeContext: ChangeContext) {
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        filter: `${'brightness' + '(' + changeContext.value + '%)'}`,
      });
    }
  }

  private setColorSlider() {
    this.colorSlider = {
      value: 2,
      options: {
        floor: 0,
        ceil: 2,
        step: 1,
        vertical: true,
        disabled: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  public onColorSliderChange(changeContext: ChangeContext): void {
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      if (changeContext.value == 1) {
        wjc.setCss(_image, {
          filter: 'grayscale(100%)',
        });
      } else if (changeContext.value == 0) {
        wjc.setCss(_image, {
          filter: 'sepia(100%)',
        });
      } else {
        wjc.setCss(_image, {
          filter: 'unset',
        });
      }
    }
  }

  private setZoomSlider() {
    this.zoomSlider = {
      value: 0,
      options: {
        floor: 0,
        ceil: 900,
        vertical: true,
        disabled: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
        stepsArray: [
          { value: 5 },
          { value: 10 },
          { value: 20 },
          { value: 30 },
          { value: 40 },
          { value: 50 },
          { value: 60 },
          { value: 70 },
          { value: 80 },
          { value: 90 },
          { value: 100 },
          { value: 150 },
          { value: 200 },
          { value: 250 },
          { value: 300 },
          { value: 350 },
          { value: 400 },
          { value: 450 },
          { value: 500 },
          { value: 550 },
          { value: 600 },
          { value: 650 },
          { value: 700 },
          { value: 750 },
          { value: 800 },
          { value: 850 },
          { value: 900 },
        ],
      },
    };
  }

  public onZoomSliderChange(changeContext: ChangeContext): void {
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    let _width = (this._imageWidth * changeContext.value) / 100;
    let _height = (this._imageHeight * changeContext.value) / 100;
    if (_image) {
      if (_width > this.maximumZoomSize || _width < this.minimumZoomSize)
        return;
      this.zoomSlider.value = changeContext.value;
      this.renderedSize = Math.round(_width) + 'x' + Math.round(_height);
      wjc.setCss(_image, {
        width: _width + 'px',
      });
    }
  }

  private setSlider() {
    if (this.value && this.value != '') {
      this.zoomSlider.options = Object.assign({}, this.zoomSlider.options, {
        disabled: false,
      });
      this.colorSlider.options = Object.assign({}, this.colorSlider.options, {
        disabled: false,
      });
      this.brightnessSliderLeft.options = Object.assign(
        {},
        this.brightnessSliderLeft.options,
        {
          disabled: false,
        }
      );
      this.brightnessSliderRight.options = Object.assign(
        {},
        this.brightnessSliderRight.options,
        {
          disabled: false,
        }
      );
      this.backgroundSlider.options = Object.assign(
        {},
        this.backgroundSlider.options,
        {
          disabled: false,
        }
      );
    } else {
      this.zoomSlider.options = Object.assign({}, this.zoomSlider.options, {
        disabled: true,
      });
      this.colorSlider.options = Object.assign({}, this.colorSlider.options, {
        disabled: true,
      });
      this.brightnessSliderLeft.options = Object.assign(
        {},
        this.brightnessSliderLeft.options,
        {
          disabled: true,
        }
      );
      this.brightnessSliderRight.options = Object.assign(
        {},
        this.brightnessSliderRight.options,
        {
          disabled: true,
        }
      );
      this.backgroundSlider.options = Object.assign(
        {},
        this.backgroundSlider.options,
        {
          disabled: true,
        }
      );
    }
  }

  private setPopup() {
    this._popup = new input.Popup(
      this.hostElement.querySelector('.bravo-picture-editor-popup'),
      {
        owner: this.hostElement?.querySelector('.bravo-picture-more'),
        position: wjc.PopupPosition.AboveRight,
        showTrigger: input.PopupTrigger.ClickOwner,
        hideTrigger:
          input.PopupTrigger.Blur |
          input.PopupTrigger.ClickOwner |
          input.PopupTrigger.Leave,
      }
    );
    this._popup.shown.addHandler((e: input.Popup) => {
      this.isPopup = e.isVisible;
    });
    this._popup.hidden.addHandler((e: input.Popup) => {
      this.isPopup = e.isVisible;
    });
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
