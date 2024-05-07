import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductAddEditComponent } from './admin-product-add-edit.component';

describe('AdminProductAddEditComponent', () => {
  let component: AdminProductAddEditComponent;
  let fixture: ComponentFixture<AdminProductAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
