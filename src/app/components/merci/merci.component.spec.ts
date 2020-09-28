import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerciComponent } from './merci.component';

describe('MerciComponent', () => {
  let component: MerciComponent;
  let fixture: ComponentFixture<MerciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
