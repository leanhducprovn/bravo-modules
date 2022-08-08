import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  public content: string = '';
  public arrContent: string[] = [];
  constructor() {}

  ngOnInit(): void {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    setInterval(() => {
      this.arrContent.push(
        possible.charAt(Math.floor(Math.random() * possible.length))
      );
    });
  }
}
