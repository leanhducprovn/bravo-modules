import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as wjc from '@grapecity/wijmo';
import { FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ChangeContext, Options } from '@angular-slider/ngx-slider';

import { ImageValueType } from '../../types/enum/image-value-type.enum';
import { Convert } from '../../library/bravo-convert/convert';

import { FormControl } from '@angular/forms';
import { BravoToolbarComponent } from '../bravo-toolbar/bravo-toolbar.component';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BravoPictureEditorComponent),
    },
  ],
})
export class BravoPictureEditorComponent
  extends wjc.Control
  implements OnInit, AfterViewInit
{
  @ViewChild('upload') private _upload!: ElementRef;
  @ViewChild('toolbar', { static: true })
  private _toolbar!: BravoToolbarComponent;
  private _imageWidth!: number;
  private _imageHeight!: number;
  private _imageOldName!: string;
  private _intrinsicSize!: string;

  public isZoom: boolean = false;
  public isBrightness: boolean = false;
  public isColor: boolean = false;
  public isOpacity: boolean = false;

  public zoomSlider!: SliderModel;
  public brightnessSliderLeft!: SliderModel;
  public brightnessSliderRight!: SliderModel;
  public colorSlider!: SliderModel;
  public opacitySlider!: SliderModel;

  public value: any;
  public imageInfo!: string;
  public renderedSize!: string;

  private _brightness: number = 100;
  private _grayscale: number = 0;
  private _sepia: number = 0;
  private _opacity: number = 100;
  private _rotate: number = 0;
  private _flipHorizontal: number = 1;
  private _flipVertical: number = 1;

  public isColorConfirm: boolean = false;
  public isOpacityConFirm: boolean = false;
  public isBrightnessConFirm: boolean = false;

  public colorSliderControl: FormControl = new FormControl(2);
  public opacitySliderControl: FormControl = new FormControl(100);
  public brightnessSliderControl: FormControl = new FormControl(100);

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
    this.invalidate();
  }
  public get imageValueType(): ImageValueType {
    return this._imageValueType;
  }

  private _nFileSizeLimit: number = 5242880;
  public set nFileSizeLimit(pValue: number) {
    if (this._nFileSizeLimit == pValue) return;
    this._nFileSizeLimit = pValue;
    this.invalidate();
  }
  public get nFileSizeLimit(): number {
    return this._nFileSizeLimit;
  }

  public currentTool!: number;

  constructor(private fb: FormBuilder, elementRef: ElementRef) {
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
    this.setSlider();
  }

  public ngOnInit(): void {
    this.setZoomSlider();
    this.setColorSlider();
    this.setBrightnessSlider();
    this.setOpacitySlider();
    this.setToolBar();
  }

  public ngAfterViewInit(): void {
    this.onToolBar();
  }

  // set filter
  public applyFilter() {
    let _imagePreview = this.hostElement?.querySelector(
      '.bravo-picture-preview img' as any
    );
    if (_imagePreview) {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = this._imageWidth;
      canvas.height = this._imageHeight;
      if (ctx) {
        ctx.filter = `brightness(${this._brightness}%) grayscale(${this._grayscale}%) sepia(${this._sepia}%) opacity(${this._opacity}%)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (this._rotate !== 0) {
          ctx.rotate((this._rotate * Math.PI) / 180);
        }
        ctx.scale(this._flipHorizontal, this._flipVertical);
        ctx.drawImage(
          _imagePreview,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );
      }
      this.imageURL = canvas.toDataURL();
      this.colorSliderControl.reset(2);
      this.isColorConfirm = false;
      this.opacitySliderControl.reset(100);
      this.isOpacityConFirm = false;
      this.brightnessSliderControl.reset(100);
      this.isBrightnessConFirm = false;
      this.resetValueFilter();
    }
  }

  // reset value filter
  private resetValueFilter() {
    this._brightness = 100;
    this._grayscale = 0;
    this._sepia = 0;
    this._opacity = 100;
    this._rotate = 0;
    this._flipHorizontal = 1;
    this._flipVertical = 1;
  }

  // save
  public onSaveImage() {
    const link = document.createElement('a');
    link.download = this._imageOldName;
    link.href = this.imageURL;
    link.click();
  }

  // printing
  public onPrinting() {
    const iframe = document.createElement('iframe') as any;
    const image = (
      this.hostElement.querySelector('.bravo-picture-preview img') as any
    ).cloneNode();
    wjc.setCss(image, {
      maxWidth: '100%',
    });
    wjc.setCss(iframe, {
      width: 0,
      height: 0,
      visibility: 'hidden',
    });
    wjc.setAttribute(iframe, 'srcdoc', '<html><body></body></html>');
    this.hostElement.appendChild(iframe);
    iframe.addEventListener('load', () => {
      const body = iframe.contentDocument.body;
      wjc.setCss(body, {
        display: 'flex',
        height: 'calc(96vh)',
        'justify-content': 'center',
        'align-items': 'center',
      });
      body.appendChild(image);
      iframe.contentWindow.print();
      iframe.contentWindow.addEventListener('afterprint', () => {
        iframe.parentNode.removeChild(iframe);
      });
    });
  }

  // paste
  public async onPaste() {
    await navigator.clipboard.read().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].types.includes('image/png')) {
        } else {
          data[i].getType('image/png').then((blob) => {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              let base64data = reader.result;
              this.imageURL = String(base64data);
            };
          });
        }
      }
    });
  }

  // copy
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

  // upload
  public onUpload(e: any) {
    let _file = e.target.files[0];
    if (_file) {
      let _fileReader = new FileReader();
      _fileReader.readAsDataURL(e.target.files[0]);
      _fileReader.onload = (eFile: any) => {
        let _src = eFile.target.result;
        if (this.getSizeBase64(_src) <= this.nFileSizeLimit) {
          this.imageURL = _src;
        } else {
          throw `Kích thước file phải nhỏ hơn hoặc bằng ${this.formatBytes(
            this.nFileSizeLimit
          )}.`;
        }
      };
      this._imageOldName = _file.name;
    }
  }

  // remove
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
    this.isOpacity = false;
    this.isBrightness = false;
    this.isColor = false;
    this.isZoom = false;
  }

  // render
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
              if (_imagePreview.clientHeight > _picturePreview.clientHeight) {
                wjc.toggleClass(_imagePreview!, 'height-100');
              }
            } else {
              wjc.toggleClass(_imagePreview!, 'height-100');
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
      this.imageInfo = ` / ${this._intrinsicSize} (${this.formatBytes(
        this.getSizeBase64(pValue)
      )})`;
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
    this.onChange(this.value);
  }

  // toolbar
  private setToolBar() {
    this._toolbar.tools = [
      {
        image: './assets/img/OpenFolder.svg',
        title: 'Upload',
        value: PeriodTool.Upload,
      },
      {
        image: './assets/img/Save.png',
        title: 'Save',
        value: PeriodTool.Save,
      },
      {
        image: './assets/img/Printer.png',
        title: 'Printer',
        value: PeriodTool.Printer,
      },
      {
        bulkhead: true,
      },
      {
        image: './assets/img/Delete.png',
        title: 'Delete',
        value: PeriodTool.Delete,
      },
      {
        image: './assets/img/Paste.svg',
        title: 'Paste',
        value: PeriodTool.Paste,
      },
      {
        image: './assets/img/Copy.png',
        title: 'Copy',
        value: PeriodTool.Copy,
      },
      {
        bulkhead: true,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Rotate left',
        value: PeriodTool.RotateLeft,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Rotate right',
        value: PeriodTool.RotateRight,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Flip vertical',
        value: PeriodTool.FlipVertical,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Flip horizontal',
        value: PeriodTool.FlipHorizontal,
      },
      {
        bulkhead: true,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Crop picture',
        value: PeriodTool.CropPicture,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Resize picture',
        value: PeriodTool.ResizePicture,
      },
      {
        bulkhead: true,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Brightness',
        value: PeriodTool.Brightness,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Color',
        value: PeriodTool.Color,
      },
      {
        image: './assets/img/favicon.png',
        title: 'Opacity',
        value: PeriodTool.Opacity,
      },
    ];
  }

  // onToolbar
  private onToolBar() {
    this._toolbar.listBox.selectedIndexChanged.addHandler((e) => {
      if (e.selectedItem) {
        this.onSelectedItem(e.selectedItem.value);
      }
    });
    this._toolbar.listBoxMore.selectedIndexChanged.addHandler((e) => {
      if (e.selectedItem) {
        this.onSelectedItem(e.selectedItem.value);
      }
    });
  }

  // onSelectedItem
  private onSelectedItem(pValue: number) {
    if (pValue == PeriodTool.Upload) {
      this._upload.nativeElement.click();
    } else if (pValue == PeriodTool.Save) {
      this.onSaveImage();
    } else if (pValue == PeriodTool.Printer) {
      this.onPrinting();
    } else if (pValue == PeriodTool.Delete) {
      this.onRemove();
    } else if (pValue == PeriodTool.Paste) {
      this.onPaste();
    } else if (pValue == PeriodTool.Copy) {
      this.onCopy();
    } else if (pValue == PeriodTool.RotateLeft) {
      this.onRotateLeft();
    } else if (pValue == PeriodTool.RotateRight) {
      this.onRotateRight();
    } else if (pValue == PeriodTool.FlipVertical) {
      this.onFlipVertical();
    } else if (pValue == PeriodTool.FlipHorizontal) {
      this.onFlipHorizontal();
    } else if (pValue == PeriodTool.CropPicture) {
      // null
    } else if (pValue == PeriodTool.ResizePicture) {
      // null
    } else if (pValue == PeriodTool.Brightness) {
      this.isZoom = false;
      this.isBrightness = !this.isBrightness;
      this.isColor = false;
      this.isOpacity = false;
      this.invalidate();
    } else if (pValue == PeriodTool.Color) {
      this.isZoom = false;
      this.isBrightness = false;
      this.isColor = !this.isColor;
      this.isOpacity = false;
      this.invalidate();
    } else if (pValue == PeriodTool.Opacity) {
      this.isZoom = false;
      this.isBrightness = false;
      this.isColor = false;
      this.isOpacity = !this.isOpacity;
      this.invalidate();
    }
  }

  // zoom
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

  // bright
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
    this._brightness = changeContext.value;
    if (changeContext.value == 100) {
      this.isBrightnessConFirm = false;
    } else {
      this.isBrightnessConFirm = true;
    }
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        filter: `brightness(${changeContext.value}%)`,
      });
    }
  }

  public onBrightnessSliderRightChange(changeContext: ChangeContext) {
    this._brightness = changeContext.value;
    if (changeContext.value == 100) {
      this.isBrightnessConFirm = false;
    } else {
      this.isBrightnessConFirm = true;
    }
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        filter: `brightness(${changeContext.value}%)`,
      });
    }
  }

  // color
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
    this.isColorConfirm = true;
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      if (changeContext.value == 1) {
        wjc.setCss(_image, {
          filter: 'grayscale(100%)',
        });
        this._grayscale = 100;
        this._sepia = 0;
      } else if (changeContext.value == 0) {
        wjc.setCss(_image, {
          filter: 'sepia(100%)',
        });
        this._grayscale = 0;
        this._sepia = 100;
      } else {
        wjc.setCss(_image, {
          filter: 'unset',
        });
        this._grayscale = 0;
        this._sepia = 0;
        this.isColorConfirm = false;
      }
    }
  }

  // opacity
  private setOpacitySlider() {
    this.opacitySlider = {
      value: 100,
      options: {
        floor: 0,
        ceil: 100,
        step: 10,
        vertical: true,
        disabled: true,
        hidePointerLabels: true,
        hideLimitLabels: true,
        showTicks: true,
      },
    };
  }

  public onOpacitySliderChange(changeContext: ChangeContext) {
    this._opacity = changeContext.value;
    if (changeContext.value == 100) {
      this.isOpacityConFirm = false;
    } else {
      this.isOpacityConFirm = true;
    }
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        filter: `opacity(${this._opacity}%)`,
      });
    }
  }

  // flip horizontal
  public onFlipHorizontal() {
    this._flipHorizontal = this._flipHorizontal === 1 ? -1 : 1;
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        transform: `scale(${this._flipHorizontal}, ${this._flipVertical})`,
      });
    }
    this.applyFilter();
  }

  // flip vertical
  public onFlipVertical() {
    this._flipVertical = this._flipVertical === 1 ? -1 : 1;
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        transform: `scale(${this._flipHorizontal}, ${this._flipVertical})`,
      });
    }
    this.applyFilter();
  }

  // rotate right
  public onRotateRight() {
    this._rotate += 90;
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        transform: `rotate(${this._rotate}deg)`,
      });
    }
    this.applyFilter();
  }

  // rotate left
  public onRotateLeft() {
    this._rotate -= 90;
    let _image = this.hostElement?.querySelector('.bravo-picture-preview img');
    if (_image) {
      wjc.setCss(_image, {
        transform: `rotate(${this._rotate}deg)`,
      });
    }
    this.applyFilter();
  }

  // slider
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
      this.opacitySlider.options = Object.assign(
        {},
        this.opacitySlider.options,
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
      this.opacitySlider.options = Object.assign(
        {},
        this.opacitySlider.options,
        {
          disabled: true,
        }
      );
    }
  }

  // get size image
  private getSizeBase64(base64: string) {
    let stringLength = base64.length - 'data:image/png;base64,'.length;
    let sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    return sizeInBytes;
  }

  // format bytes
  private formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
  }
}

export enum PeriodTool {
  Upload = 0,
  Save = 1,
  Printer = 2,
  Delete = 3,
  Paste = 4,
  Copy = 5,
  RotateLeft = 6,
  RotateRight = 7,
  FlipVertical = 8,
  FlipHorizontal = 9,
  CropPicture = 10,
  ResizePicture = 11,
  Brightness = 12,
  Color = 13,
  Opacity = 14,
}
