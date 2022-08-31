import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionsComponent } from './professions.component';

describe('ProfessionsComponent', () => {
  let component: ProfessionsComponent;
  let fixture: ComponentFixture<ProfessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
