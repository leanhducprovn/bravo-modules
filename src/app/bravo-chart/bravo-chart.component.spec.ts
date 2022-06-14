import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BravoChartComponent } from './bravo-chart.component';

describe('BravoChartComponent', () => {
  let component: BravoChartComponent;
  let fixture: ComponentFixture<BravoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BravoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BravoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
