import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionTimbresComponent } from './admin-gestion-timbres.component';

describe('AdminGestionTimbresComponent', () => {
  let component: AdminGestionTimbresComponent;
  let fixture: ComponentFixture<AdminGestionTimbresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGestionTimbresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGestionTimbresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
