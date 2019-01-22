import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSTreeComponent } from './ms-tree.component';

describe('MSTreeComponent', () => {
  let component: MSTreeComponent;
  let fixture: ComponentFixture<MSTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
