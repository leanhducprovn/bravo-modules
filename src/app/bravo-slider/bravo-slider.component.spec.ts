import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BravoSliderComponent } from './bravo-slider.component';

describe('BravoSliderComponent', () => {
  let component: BravoSliderComponent;
  let fixture: ComponentFixture<BravoSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BravoSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BravoSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
