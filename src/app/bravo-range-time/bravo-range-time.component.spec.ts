import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BravoRangeTimeComponent } from './bravo-range-time.component';

describe('BravoRangeTimeComponent', () => {
  let component: BravoRangeTimeComponent;
  let fixture: ComponentFixture<BravoRangeTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BravoRangeTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BravoRangeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
