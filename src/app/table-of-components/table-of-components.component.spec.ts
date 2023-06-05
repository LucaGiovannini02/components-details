import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfComponentsComponent } from './table-of-components.component';

describe('TableOfComponentsComponent', () => {
  let component: TableOfComponentsComponent;
  let fixture: ComponentFixture<TableOfComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
