import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionSideComponent } from './profession-side.component';

describe('ProfessionSideComponent', () => {
  let component: ProfessionSideComponent;
  let fixture: ComponentFixture<ProfessionSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
