import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionWheelComponent } from './profession-wheel.component';

describe('ProfessionWheelComponent', () => {
  let component: ProfessionWheelComponent;
  let fixture: ComponentFixture<ProfessionWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionWheelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
