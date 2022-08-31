import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionTabComponent } from './profession-tab.component';

describe('ProfessionTabComponent', () => {
  let component: ProfessionTabComponent;
  let fixture: ComponentFixture<ProfessionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
