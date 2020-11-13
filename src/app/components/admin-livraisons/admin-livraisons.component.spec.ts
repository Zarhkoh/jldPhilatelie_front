import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLivraisonsComponent } from './admin-livraisons.component';

describe('AdminLivraisonsComponent', () => {
  let component: AdminLivraisonsComponent;
  let fixture: ComponentFixture<AdminLivraisonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLivraisonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLivraisonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
