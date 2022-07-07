import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BravoChecklistComponent } from './bravo-checklist.component';

describe('BravoChecklistComponent', () => {
  let component: BravoChecklistComponent;
  let fixture: ComponentFixture<BravoChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BravoChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BravoChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
