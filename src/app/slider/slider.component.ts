import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnChanges,
  OnDestroy,
  HostBinding,
  HostListener,
  Input,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
  ContentChild,
  TemplateRef,
  ChangeDetectorRef,
  SimpleChanges,
  forwardRef,
  NgZone,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import {
  Options,
  LabelType,
  ValueToPositionFunction,
  PositionToValueFunction,
  CustomStepDefinition,
} from './options';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor
{
  // Mô hình cho giá trị thấp của thanh trượt. Đối với thanh trượt đơn giản, đây là đầu vào duy nhất. Đối với thanh trượt phạm vi, đây là giá trị thấp.
  @Input()
  public value!: number;
  // Đầu ra cho thanh trượt giá trị thấp để hỗ trợ ràng buộc hai chiều
  @Output()
  public valueChange: EventEmitter<number> = new EventEmitter();

  // Mô hình cho giá trị cao của thanh trượt. Không được sử dụng trong thanh trượt đơn giản. Đối với thanh trượt phạm vi, đây là giá trị cao.
  @Input()
  public highValue!: number;
  // Đầu ra cho thanh trượt giá trị cao để hỗ trợ ràng buộc hai chiều
  @Output()
  public highValueChange: EventEmitter<number> = new EventEmitter();

  // Một đối tượng với tất cả các tùy chọn khác của thanh trượt.
  // Mỗi tùy chọn có thể được cập nhật trong thời gian chạy và thanh trượt sẽ tự động được hiển thị lại.
  @Input()
  public options: Options = new Options();

  constructor() {}

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  ngOnDestroy(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}
}
