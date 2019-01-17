import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MSTreeContainerComponent } from './ms-tree-container.component';

describe('MSTreeContainerComponent', () => {
  let component: MSTreeContainerComponent;
  let fixture: ComponentFixture<MSTreeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MSTreeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MSTreeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
