import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionConnectorComponent } from './profession-connector.component';

describe('ProfessionConnectorComponent', () => {
  let component: ProfessionConnectorComponent;
  let fixture: ComponentFixture<ProfessionConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionConnectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
