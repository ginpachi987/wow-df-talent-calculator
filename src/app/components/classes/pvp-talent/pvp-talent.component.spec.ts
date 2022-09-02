import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvpTalentComponent } from './pvp-talent.component';

describe('PvpTalentComponent', () => {
  let component: PvpTalentComponent;
  let fixture: ComponentFixture<PvpTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PvpTalentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvpTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
