import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeParameterComponent } from './change-parameter.component';

describe('ChangeParameterComponent', () => {
  let component: ChangeParameterComponent;
  let fixture: ComponentFixture<ChangeParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeParameterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
