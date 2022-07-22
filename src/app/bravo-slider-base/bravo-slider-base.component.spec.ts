import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BravoSliderBaseComponent } from './bravo-slider-base.component';

describe('BravoSliderBaseComponent', () => {
  let component: BravoSliderBaseComponent;
  let fixture: ComponentFixture<BravoSliderBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BravoSliderBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BravoSliderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
