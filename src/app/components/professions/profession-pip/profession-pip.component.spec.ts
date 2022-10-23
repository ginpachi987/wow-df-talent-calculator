import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionPipComponent } from './profession-pip.component';

describe('ProfessionPipComponent', () => {
  let component: ProfessionPipComponent;
  let fixture: ComponentFixture<ProfessionPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionPipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
