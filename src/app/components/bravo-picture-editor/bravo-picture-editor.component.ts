import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bravo-picture-editor',
  templateUrl: './bravo-picture-editor.component.html',
  styleUrls: ['./bravo-picture-editor.component.scss'],
})
export class BravoPictureEditorComponent implements OnInit {
  public isZoom: boolean = false;
  public isAdvanced: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
