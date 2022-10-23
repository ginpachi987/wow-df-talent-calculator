import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionDialComponent } from './profession-dial.component';

describe('ProfessionDialComponent', () => {
  let component: ProfessionDialComponent;
  let fixture: ComponentFixture<ProfessionDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionDialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
