import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bravo-toolbar',
  templateUrl: './bravo-toolbar.component.html',
  styleUrls: [
    './bravo-toolbar.component.css',
    './bravo-toolbar.component.scss',
  ],
})
export class BravoToolbarComponent implements OnInit {
  public tools = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  constructor() {}

  ngOnInit(): void {}
}
