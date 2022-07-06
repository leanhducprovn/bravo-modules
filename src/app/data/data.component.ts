import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  // bravo slider
  optionsSlider!: Options;

  formSlider = this.fb.group({
    dataSlider: [[50, 150]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // bravo slider
    this.optionsSlider = {
      floor: 0,
      ceil: 200,
    };

    this.formSlider.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  // bravo range time
  timeEvent(min: Date, max: Date) {
    console.log(min, '=>', max);
  }
}
