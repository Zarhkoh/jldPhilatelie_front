import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimbreListComponent } from './timbre-list.component';

describe('TimbreListComponent', () => {
  let component: TimbreListComponent;
  let fixture: ComponentFixture<TimbreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimbreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimbreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
