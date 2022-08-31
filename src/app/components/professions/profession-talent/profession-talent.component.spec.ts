import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionTalentComponent } from './profession-talent.component';

describe('ProfessionTalentComponent', () => {
  let component: ProfessionTalentComponent;
  let fixture: ComponentFixture<ProfessionTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionTalentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
