import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePageComponent } from './choose-page.component';

describe('ChoosePageComponent', () => {
  let component: ChoosePageComponent;
  let fixture: ComponentFixture<ChoosePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
