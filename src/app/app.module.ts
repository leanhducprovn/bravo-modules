import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataComponent } from './data/data.component';
import { BravoRangeSliderComponent } from './bravo-range-slider/bravo-range-slider.component';
import { BravoChartComponent } from './bravo-chart/bravo-chart.component';
import { PieChartComponent } from './bravo-chart/pie-chart/pie-chart.component';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { BravoRangeTimeComponent } from './bravo-range-time/bravo-range-time.component';
import { BravoChecklistComponent } from './bravo-checklist/bravo-checklist.component';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';
import { BravoSliderBaseComponent } from './bravo-slider-base/bravo-slider-base.component';
import { BravoBarcodeBoxComponent } from './bravo-barcode-box/bravo-barcode-box.component';

// Barcode Box
import { WjBarcodeCommonModule } from '@grapecity/wijmo.angular2.barcode.common';
import { WjBarcodeSpecializedModule } from '@grapecity/wijmo.angular2.barcode.specialized';
import { WjBarcodeCompositeModule } from '@grapecity/wijmo.angular2.barcode.composite';

@NgModule({
  declarations: [
    AppComponent,
    BravoRangeSliderComponent,
    DataComponent,
    BravoChartComponent,
    PieChartComponent,
    BravoRangeTimeComponent,
    BravoChecklistComponent,
    BravoSliderBaseComponent,
    BravoBarcodeBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    ReactiveFormsModule,
    FormsModule,
    WjChartModule,
    WjChartAnimationModule,
    WjInputModule,
    HighlightModule,
    HighlightPlusModule,
    WjBarcodeCommonModule,
    WjBarcodeSpecializedModule,
    WjBarcodeCompositeModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: <HighlightOptions>{
        lineNumbers: true,
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
