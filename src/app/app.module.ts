import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BravoSliderComponent } from './bravo-slider/bravo-slider.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DataComponent } from './data/data.component';

@NgModule({
  declarations: [AppComponent, BravoSliderComponent, DataComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSliderModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
