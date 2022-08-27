import { Component, ElementRef, OnInit } from '@angular/core';

import * as input from '@grapecity/wijmo.input';
import * as wjc from '@grapecity/wijmo';

import {
  ChangeContext,
  Options,
  PointerType,
} from '@angular-slider/ngx-slider';

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
  private _popup!: input.Popup;
  private _renderedSize!: string;
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

  constructor(elementRef: ElementRef) {
    super(elementRef.nativeElement);
  }

  public override refresh(fullUpdate?: boolean | undefined): void {
    super.refresh(fullUpdate);
    this.reader();
  }

  public ngOnInit(): void {
    this.setPopup();
    this.setZoomSlider();
    this.setColorSlider();
    this.setBrightnessSlider();
    this.setBackgroundSlider();
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

  private reader(
    pValue: string = this.imageURL,
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
      this._intrinsicSize = _image.width + 'x' + _image.height;
      if (_imagePreview && _picturePreview) {
        wjc.removeClass(_imagePreview!, 'null default width-100 height-100');
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
        this._renderedSize =
          _imagePreview.clientWidth + 'x' + _imagePreview.clientHeight;
      }
      this.imageInfo = `${
        this._renderedSize +
        ' / ' +
        this._intrinsicSize +
        ' (' +
        this.formatBytes(this.getSizeBase64(pValue)) +
        ')'
      }`;
    };
  }

  private setBackgroundSlider() {
    this.backgroundSlider = {
      value: 10,
      options: {
        floor: 0,
        ceil: 10,
        step: 1,
        vertical: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  private setBrightnessSlider() {
    this.brightnessSliderLeft = {
      value: 10,
      options: {
        floor: 1,
        ceil: 20,
        step: 1,
        vertical: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
    this.brightnessSliderRight = {
      value: 10,
      options: {
        floor: 1,
        ceil: 20,
        step: 1,
        vertical: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  private setColorSlider() {
    this.colorSlider = {
      value: 2,
      options: {
        floor: 0,
        ceil: 2,
        step: 1,
        vertical: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  private setZoomSlider() {
    this.zoomSlider = {
      value: 0,
      options: {
        floor: 0,
        ceil: 900,
        vertical: true,
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
    this.zoomSlider.value = changeContext.value;
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
