import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointAllocateComponent } from './point-allocate.component';

describe('PointAllocateComponent', () => {
  let component: PointAllocateComponent;
  let fixture: ComponentFixture<PointAllocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointAllocateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
