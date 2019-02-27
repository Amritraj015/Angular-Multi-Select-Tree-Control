import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsShowSelectedComponent } from './ms-show-selected.component';

describe('MsShowSelectedComponent', () => {
  let component: MsShowSelectedComponent;
  let fixture: ComponentFixture<MsShowSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsShowSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsShowSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
