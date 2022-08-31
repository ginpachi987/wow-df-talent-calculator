import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTalentComponent } from './class-talent.component';

describe('ClassTalentComponent', () => {
  let component: ClassTalentComponent;
  let fixture: ComponentFixture<ClassTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassTalentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
