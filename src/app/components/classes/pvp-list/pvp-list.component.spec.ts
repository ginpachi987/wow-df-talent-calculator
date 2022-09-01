import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvpListComponent } from './pvp-list.component';

describe('PvpListComponent', () => {
  let component: PvpListComponent;
  let fixture: ComponentFixture<PvpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PvpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
