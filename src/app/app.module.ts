import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataComponent } from './data/data.component';
import { BravoSliderComponent } from './bravo-slider/bravo-slider.component';
import { BravoChartComponent } from './bravo-chart/bravo-chart.component';
import { PieChartComponent } from './bravo-chart/pie-chart/pie-chart.component';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartAnimationModule } from '@grapecity/wijmo.angular2.chart.animation';

@NgModule({
  declarations: [
    AppComponent,
    BravoSliderComponent,
    DataComponent,
    BravoChartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    ReactiveFormsModule,
    WjChartModule,
    WjChartAnimationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
