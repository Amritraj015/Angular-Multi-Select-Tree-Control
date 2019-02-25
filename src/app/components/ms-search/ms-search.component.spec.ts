import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsSearchComponent } from './ms-search.component';

describe('MsSearchComponent', () => {
  let component: MsSearchComponent;
  let fixture: ComponentFixture<MsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
