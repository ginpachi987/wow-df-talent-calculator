import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassConnectorComponent } from './class-connector.component';

describe('ClassConnectorComponent', () => {
  let component: ClassConnectorComponent;
  let fixture: ComponentFixture<ClassConnectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassConnectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
