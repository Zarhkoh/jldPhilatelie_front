import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionNewsComponent } from './admin-gestion-news.component';

describe('AdminGestionNewsComponent', () => {
  let component: AdminGestionNewsComponent;
  let fixture: ComponentFixture<AdminGestionNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGestionNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGestionNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
