import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  // slider
  optionsSlider!: Options;

  formSlider = this.fb.group({
    dataSlider: [[50, 200]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // slider
    this.optionsSlider = {
      floor: 0,
      ceil: 250,
    };

    this.formSlider.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
