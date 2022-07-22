import { Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bravo-slider-base',
  templateUrl: './bravo-slider-base.component.html',
  styleUrls: ['./bravo-slider-base.component.css'],
})
export class BravoSliderBaseComponent implements OnInit {
  options: Options = {
    floor: 0,
    ceil: 250,
  };

  constructor() {}

  ngOnInit(): void {}
}
