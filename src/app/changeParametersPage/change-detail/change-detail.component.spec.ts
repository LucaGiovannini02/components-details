import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetailComponent } from './change-detail.component';

describe('ChangeDetailComponent', () => {
  let component: ChangeDetailComponent;
  let fixture: ComponentFixture<ChangeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
