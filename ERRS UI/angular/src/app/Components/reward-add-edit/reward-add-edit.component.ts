import { Component, Inject, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminRewardService } from '../../Services/admin-reward.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackService } from 'src/app/Services/snack.service';

@Component({
  selector: 'app-reward-add-edit',
  templateUrl: './reward-add-edit.component.html',
  styleUrls: ['./reward-add-edit.component.css']
})
export class RewardAddEditComponent implements OnInit {

  RewardForm: FormGroup = new FormGroup({
    rewardName: new FormControl(''),
    points: new FormControl(''),
    description: new FormControl('')
  });
  submitted = false;

  constructor(private formBuilder: FormBuilder, private rewardadd: AdminRewardService, private snackService: SnackService,
    private _dialogref: MatDialogRef<RewardAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.RewardForm = this.formBuilder.group({
      rewardName: '',
      points: '',
      description: ''

    });
  }
  ngOnInit(): void {

    this.RewardForm = this.formBuilder.group({
      rewardName: ['', Validators.required],
      points: ['', Validators.required],
      description: ['', Validators.required]

    });
    this.RewardForm.patchValue(this.data);
  }
  get rewardFunction(): { [key: string]: AbstractControl } {
    return this.RewardForm.controls;
  }
  OnFormSubmit() {
    this.submitted = true;
    if (this.RewardForm.valid) {
      if (this.data) {
        this.rewardadd.editreward(this.data.id, this.RewardForm.value).subscribe({
          next: (res: any) => {
            this.snackService.openSnackBar("Reward Details Updated");
            this._dialogref.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });


      } else {
        this.rewardadd.addadminreward(this.RewardForm.value).subscribe({
          next: (val: any) => {
            this.snackService.openSnackBar("Reward Added Successfully")
            this._dialogref.close(true);

          },
          error: (err: any) => {
            console.error(err);
            // this.snackService.openSnackBar(err?.error)
            
          },
        });
      }


    }

  }
}
