import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardAddEditComponent } from './reward-add-edit.component';

describe('RewardAddEditComponent', () => {
  let component: RewardAddEditComponent;
  let fixture: ComponentFixture<RewardAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
