import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionListComponent } from './profession-list.component';

describe('ProfessionListComponent', () => {
  let component: ProfessionListComponent;
  let fixture: ComponentFixture<ProfessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
