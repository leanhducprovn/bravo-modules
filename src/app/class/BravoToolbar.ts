import * as wjc from '@grapecity/wijmo';
// import ResizeObserver from 'resize-observer-polyfill';

// const ResizeObserverPolyfill = require('resize-observer-polyfill');
// const observer: ResizeObserver = new ResizeObserverPolyfill();

export class BravoToolbal extends wjc.Control {
  constructor(hostElement: HTMLElement | null) {
    super(hostElement);
    console.log(hostElement);
  }
}
