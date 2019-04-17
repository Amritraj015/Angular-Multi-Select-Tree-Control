import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsTreeControlComponent } from './ms-tree-control.component';

describe('MsTreeControlComponent', () => {
  let component: MsTreeControlComponent;
  let fixture: ComponentFixture<MsTreeControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsTreeControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsTreeControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
