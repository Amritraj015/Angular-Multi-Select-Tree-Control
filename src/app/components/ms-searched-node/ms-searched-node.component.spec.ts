import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSearchedNodeComponent } from './ms-searched-node.component';

describe('MsSearchedNodeComponent', () => {
  let component: MsSearchedNodeComponent;
  let fixture: ComponentFixture<MsSearchedNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsSearchedNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsSearchedNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
