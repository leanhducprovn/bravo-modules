import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataComponent } from './home/data/data.component';
import { BravoRangeSliderComponent } from './components/bravo-range-slider/bravo-range-slider.component';
import { BravoChartComponent } from './components/bravo-chart/bravo-chart.component';
import { PieChartComponent } from './components/bravo-chart/pie-chart/pie-chart.component';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';
import { BravoRangeTimeComponent } from './components/bravo-range-time/bravo-range-time.component';
import { BravoChecklistComponent } from './components/bravo-checklist/bravo-checklist.component';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import {
  HighlightModule,
  HighlightOptions,
  HIGHLIGHT_OPTIONS,
} from 'ngx-highlightjs';
import { BravoSliderBaseComponent } from './components/bravo-slider-base/bravo-slider-base.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { BravoControlBaseComponent } from './components/bravo-control-base/bravo-control-base.component';
import { BravoPictureInputBoxComponent } from './components/bravo-picture-input-box/bravo-picture-input-box.component';
import { BravoPictureEditorComponent } from './components/bravo-picture-editor/bravo-picture-editor.component';
import { ComponentsComponent } from './components/components.component';
import { BravoToolbarComponent } from './components/bravo-toolbar/bravo-toolbar.component';
import { BravoTabGridLayoutComponent } from './components/bravo-tab-grid-layout/bravo-tab-grid-layout.component';
import { WjNavModule } from '@grapecity/wijmo.angular2.nav';
import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

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
    PageNotFoundComponent,
    HomeComponent,
    BravoControlBaseComponent,
    BravoPictureInputBoxComponent,
    BravoPictureEditorComponent,
    ComponentsComponent,
    BravoToolbarComponent,
    BravoTabGridLayoutComponent,
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
    WjNavModule,
    WjGridModule,
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
